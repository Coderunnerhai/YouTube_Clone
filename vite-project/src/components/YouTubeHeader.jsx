import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const YouTubeHeader = ({ onMenuClick, searchTerm, setSearchTerm }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="yt-header">
      <div className="yt-left">
        <span className="yt-menu" onClick={onMenuClick}>&#9776;</span>
        <img
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          alt="YouTube"
          className="yt-logo"
        />
      </div>

      <div className="yt-search">
        <input
          type="text"
          placeholder="Search"
          className="yt-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="yt-search-btn">&#128269;</button>
      </div>

      <div className="yt-right">
        {user ? (
  <span>Welcome, {user.username}</span>
) : (
  <>
    <button 
      className="yt-auth-btn" 
      onClick={() => navigate('/register')}
      style={{ marginLeft: '10px', cursor: 'pointer' }}
    >
      Register
    </button>
    <Link to="/signin">Sign In</Link>
  </>
)}
        </div>
    </header>
  );
};

export default YouTubeHeader;