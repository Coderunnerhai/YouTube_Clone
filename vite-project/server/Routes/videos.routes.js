import express from 'express';
import Video from '../Models/video.model.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;