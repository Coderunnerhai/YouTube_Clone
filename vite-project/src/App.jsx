import React, { useState } from 'react';
import YouTubeHeader from "./components/YouTubeHeader";
import Sidebar from "./components/Sidebar";
import './App.css';
import CategoryFilter from './components/CategoryFilter';
import { useContext } from 'react';
import { UserContext } from "./components/UserContext";
import VideoGrid from "./components/VideoGrid";
import VideoDetail from "./components/VideoDetail";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const { user } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="app-container">
      <YouTubeHeader
        onMenuClick={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="content">
          {user && (
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}
          {selectedVideo ? (
            <VideoDetail video={selectedVideo} onBack={() => setSelectedVideo(null)} />
          ) : (
            <VideoGrid
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              onSelectVideo={setSelectedVideo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
