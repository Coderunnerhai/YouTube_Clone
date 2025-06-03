import React, { useState, useEffect } from "react";
import "./VideoDetail.css";
import { useParams } from 'react-router-dom';

const videoIds = {
  1: "W6NZfCO5SIk",
  2: "jS4aFq5-91M",
  3: "2ekLRIjFg1M",
  4: "xNN7iTA57jM",
  5: "aqz-KE-bpKQ",
};

const VideoDetail = ({ video }) => {
  const { id: videoId } = useParams();
  console.log('🧪 videoId:', videoId);
  const [likes, setLikes] = useState(video.likes || 0);
  const [dislikes, setDislikes] = useState(video.dislikes || 0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!video?._id) return;

      setLoadingComments(true);
      try {
        const res = await fetch(`http://localhost:5100/videos/${video._id}/comments`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data.comments || data);
      } catch (err) {
        console.error("Error loading comments", err);
        setError("Could not load comments");
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [video]);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setDislikes((prev) => prev + 1);

  const handleAddComment = async (e) => {
    const token = localStorage.getItem('token');
  console.log('📦 JWT token:', token);
  console.log('📹 videoId:', videoId);

  e.preventDefault();
  if (!commentInput.trim()) return;

  try {
    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    const res = await fetch(`http://localhost:5100/videos/${video._id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: commentInput }),
    });

    if (!res.ok) throw new Error("Failed to add comment");

    const response = await res.json();

    // Push just the newly added comment (not the whole array if you return that)
    setComments((prev) => [...prev, response.comment || response]);
    setCommentInput("");
  } catch (err) {
    console.error("❌ Failed to add comment:", err);
    alert("Failed to add comment");
  }
};

  const handleDeleteComment = (id) => {
    setComments((prev) => prev.filter((comment) => comment._id !== id));
  };

  if (!video) return <p>Select a video to see details.</p>;

  console.log("Video passed to VideoDetail:", video);
  console.log("Video:", video);

  return (
    <div className="video-detail">
      <h2>{video.title}</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoIds[video.id]}`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>{video.description}</p>

      <div className="video-actions">
        <button onClick={handleLike}>👍 Like {likes}</button>
        <button onClick={handleDislike}>👎 Dislike {dislikes}</button>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        {loadingComments && <p>Loading comments...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          {comments.length === 0 && !loadingComments && <p>No comments yet. Be the first to comment!</p>}
          {comments.map((comment, index) => (
            <div
              key={index}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ddd",
                paddingBottom: "0.5rem",
              }}
            >
              <strong>{comment.username || "Guest"}</strong>: {comment.text}
              <br />
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment} style={{ marginTop: "1rem" }}>
          <textarea
            rows="3"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write your comment..."
            style={{ width: "100%" }}
          />
          <button type="submit" disabled={!commentInput.trim()}>
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoDetail;