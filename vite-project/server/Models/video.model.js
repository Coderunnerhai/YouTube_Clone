import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  channel: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
    default: ''
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

export default mongoose.models.Video || mongoose.model('Video', videoSchema);