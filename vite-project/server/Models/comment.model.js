import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: String,
  user: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;