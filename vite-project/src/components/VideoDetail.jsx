import React, { useState, useEffect } from "react";
import "./VideoDetail.css";
import { useParams } from 'react-router-dom';

const videos = [
  {
    id: 1,
    title: "Sample Nature Video",
    description: "Relaxing nature scenes with ambient sound.",
    url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  },
  {
    id: 2,
    title: "Waterfall Video",
    description: "Beautiful waterfall in a forest.",
    url: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  },
  {
    id: 3,
    title: "City Timelapse",
    description: "Fast-paced city life timelapse footage.",
    url: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
  },
  {
    id: 4,
    title: "Calm Beach",
    description: "Waves gently hitting the beach.",
    url: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
  },
  {
    id: 5,
    title: "Night Sky",
    description: "A peaceful view of the starry night sky.",
    url: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
  },
];

const VideoDetail = ({ video }) => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const { id: videoId } = useParams();
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
      <h2>{selectedVideo.title}</h2>

      <video width="560" height="315" controls>
        <source src={selectedVideo.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <p>{selectedVideo.description}</p>

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