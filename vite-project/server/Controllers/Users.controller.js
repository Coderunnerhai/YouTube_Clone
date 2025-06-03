import User from '../Models/Users.model.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const user = new User({
      userId: uuidv4(),
      username,
      email,
      password: await bcrypt.hash(password, 10),
      avatar,
      channels: [],
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const seedMockUser = async () => {
  const existing = await User.findOne({ email: 'john@example.com' });
  if (existing) return console.log('✅ Mock user already exists');

  const user = new User({
    userId: 'user01',
    username: 'JohnDoe',
    email: 'john@example.com',
    password: await bcrypt.hash('plainPassword', 10),
    avatar: 'https://example.com/avatar/johndoe.png',
    channels: ['channel01'],
  });

  await user.save();
  console.log('🌱 Mock user seeded');
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log('Password length:', password.length);
console.log('Password char codes:', password.split('').map(c => c.charCodeAt(0)));
console.log('DB hash:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ isMatch:', isMatch);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({
  message: 'Login successful',
  user: { userId: user.userId, username: user.username, email: user.email },
  token,
});
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};