import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  avatar: String,
  channels: [String],
});

export default mongoose.model('User', userSchema);