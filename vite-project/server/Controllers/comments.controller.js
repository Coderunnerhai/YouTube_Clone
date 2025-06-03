import Video from '../Models/video.model.js';

export const addComment = async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: 'Comment text required' });

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const newComment = {
      userId: req.user.id,
      username: req.user.username,
      text
    };

    video.comments.push(newComment);
    await video.save();

    res.status(201).json(video.comments.at(-1));
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
};

export const updateComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const { text } = req.body;

  console.log('updateComment called with:', { videoId, commentId, text, userId: req.user.id });

  if (!text) return res.status(400).json({ message: 'Comment text required' });

  try {
    const video = await Video.findById(videoId);
    if (!video) 
      console.log('Video not found');
    return res.status(404).json({ message: 'Video not found' });

    const comment = video.comments.id(commentId);
    console.log('Comment not found');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id.toString())
      console.log('User not authorized to edit comment');

      return res.status(403).json({ message: 'Not authorized to edit this comment' });

    comment.text = text;
    await video.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating comment' });
  }
};

export const deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id.toString())
      return res.status(403).json({ message: 'Not authorized to delete this comment' });

    comment.remove();
    await video.save();

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};