import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import usersRoutes from './Routes/Users.routes.js';
import { seedMockUser } from './Controllers/users.controller.js';
import videoRoutes from './Routes/videos.routes.js';
import commentRoutes from './Routes/comments.routes.js';
const app = express();          // ✅ Declare app early
app.use(cors());
app.use(express.json());        // ✅ Parse JSON
app.use('/users', usersRoutes);
app.use('/videos', commentRoutes);
app.use('/videos', videoRoutes);

mongoose.connect('mongodb://localhost:27017/videoAppDB')
.then(async () => {
    console.log('✅ Connected to MongoDB');

    await seedMockUser(); // ✅ Seed the mock user after DB connects

    app.listen(5100, () => console.log('🚀 Server running on port 5100'));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });