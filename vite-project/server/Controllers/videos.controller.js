import Video from '../Models/video.model.js';

const seedVideos = [
  {
    title: 'Intro to React',
    description: 'Learn the basics of React.',
    channel: 'React Channel',
    category: 'Education',
    views: 1234,
    likes: 100,
    dislikes: 2,
    youtubeId: 'W6NZfCO5SIk',
    thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg',
  },
  {
    title: 'Node.js Crash Course',
    description: 'Learn Node.js in one video.',
    channel: 'Node Channel',
    category: 'Education',
    views: 4321,
    likes: 200,
    dislikes: 3,
    youtubeId: 'TlB_eWDSMt4',
    thumbnail: 'https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg',
  },
];

export async function seedDefaultVideos() {
  const count = await Video.countDocuments();
  if (count === 0) {
    await Video.insertMany(seedVideos);
    console.log('🌱 Seeded default videos');
  } else {
    console.log('🎉 Videos already seeded');
  }
}