import express from 'express';
import { addComment, updateComment, deleteComment } from '../Controllers/comments.controller.js';
import authMiddleware from '../authMiddleware.js';
import Video from '../Models/video.model.js';

const router = express.Router();

router.get('/:videoId/comments', async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ comments: video.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

router.post('/:videoId/comments', authMiddleware,  async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;
    const user = req.user?.username || 'Anonymous';

    if (!text) return res.status(400).json({ message: 'Comment text is required' });

    // Find video by ID
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Add comment
    video.comments.push({ text, user });
    await video.save();

    res.status(201).json({ message: 'Comment added', comments: video.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
});
router.put('/:videoId/comments/:commentId', authMiddleware, updateComment);
router.delete('/:videoId/comments/:commentId', authMiddleware, deleteComment);

export default router;