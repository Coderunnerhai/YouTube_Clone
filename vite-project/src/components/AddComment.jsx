import { useState } from 'react';


const AddComment = ({ videoId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be signed in to comment.');
      return;
    }

    const userId = localStorage.getItem('userId'); 
    try {
      const response = await fetch(`http://localhost:5100/videos/${videoId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: commentText })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add comment');
      }

      const newComment = await response.json();
      setCommentText('');
      setError('');
      if (onCommentAdded) {
        onCommentAdded(newComment); // Call parent callback to update UI
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleAddComment}>
        <textarea
          rows="3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button type="submit" style={{ marginTop: '0.5rem' }}>Add Comment</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
};

export default AddComment;