const API_BASE = 'http://localhost:5100/api'; // change to your backend URL

// Helper for GET requests
async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  return res.json();
}

// Helper for POST/PUT/DELETE requests
async function sendJSON(url, method, data) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`${method} ${url} failed: ${res.status}`);
  return res.json();
}

// Videos

export async function fetchVideos() {
  return getJSON(`${API_BASE}/videos`);
}

export async function fetchVideoById(id) {
  return getJSON(`${API_BASE}/videos/${id}`);
}

export async function addVideo(videoData) {
  return sendJSON(`${API_BASE}/videos`, 'POST', videoData);
}

export async function updateVideo(id, videoData) {
  return sendJSON(`${API_BASE}/videos/${id}`, 'PUT', videoData);
}

export async function deleteVideo(id) {
  return sendJSON(`${API_BASE}/videos/${id}`, 'DELETE');
}

// Comments

export async function addComment(videoId, commentData) {
  return sendJSON(`${API_BASE}/videos/${videoId}/comments`, 'POST', commentData);
}

export async function updateComment(videoId, commentId, commentData) {
  return sendJSON(`${API_BASE}/videos/${videoId}/comments/${commentId}`, 'PUT', commentData);
}

export async function deleteComment(videoId, commentId) {
  return sendJSON(`${API_BASE}/videos/${videoId}/comments/${commentId}`, 'DELETE');
}

// Auth example

export async function signIn(credentials) {
  return sendJSON(`${API_BASE}/auth/signin`, 'POST', credentials);
}

export async function signUp(userData) {
  return sendJSON(`${API_BASE}/auth/signup`, 'POST', userData);
}