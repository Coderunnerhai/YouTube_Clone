import mongoose from 'mongoose';
import { mockUsers } from './utils/mockData.js';
import User from './Models/Users.model.js';

export async function seedUsers() {
  try {
    const count = await User.countDocuments();

    if (count === 0) {
      await User.insertMany(mockUsers);
      console.log('✅ Mock users seeded!');
    } else {
      console.log('ℹ️ Users already exist. Skipping seeding.');
    }
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}