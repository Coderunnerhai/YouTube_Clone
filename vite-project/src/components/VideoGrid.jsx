import React from 'react';
import "../App.css";

const videos = [
  {
    title: "React Tutorial for Beginners",
    channel: "Code Academy",
    views: "1.2M views",
    thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    category: "Education",
    description: "Learn the basics of React in this tutorial for beginners!",
    likes: 1230,
    dislikes: 45,
  },
  {
    title: "JavaScript in 1 Hour",
    channel: "JS Mastery",
    views: "980K views",
    thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    category: "Programming",
    description: "Master JavaScript fundamentals in just one hour!",
    likes: 900,
    dislikes: 30,
  },
  {
    title: "Learn HTML & CSS",
    channel: "Web Dev Simplified",
    views: "730K views",
    thumbnail: "https://i.ytimg.com/vi/mU6anWqZJcc/hqdefault.jpg",
    category: "Design",
    description: "A complete guide to HTML & CSS for beginners.",
    likes: 850,
    dislikes: 20,
  },
  {
    title: "Node.js Crash Course",
    channel: "Traversy Media",
    views: "1.5M views",
    thumbnail: "https://i.ytimg.com/vi/fBNz5xF-Kx4/hqdefault.jpg",
    category: "Programming",
    description: "Get up to speed with Node.js in this crash course.",
    likes: 1450,
    dislikes: 60,
  },
  {
    title: "Tailwind CSS Tutorial",
    channel: "Net Ninja",
    views: "810K views",
    thumbnail: "https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg",
    category: "Design",
    description: "Learn how to build stunning UIs with Tailwind CSS.",
    likes: 780,
    dislikes: 25,
  },
];

const VideoGrid = ({ searchTerm, selectedCategory, onSelectVideo }) => {
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="video-grid">
      {filteredVideos.length === 0 && (
        <p>No videos found for the selected criteria.</p>
      )}
      {filteredVideos.map((video) => (
        <div
          key={video.id}
          className="video-card"
          onClick={() => onSelectVideo(video)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="video-thumbnail"
          />
          <div className="video-info">
            <h4 className="video-title">{video.title}</h4>
            <p className="video-channel">{video.channel}</p>
            <p className="video-views">{video.views}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;