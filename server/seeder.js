const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Post = require('./models/Post');
const Category = require('./models/Category');
const Tag = require('./models/Tag');

// Force Google DNS to fix SRV record lookup issues
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Post.deleteMany();
    await Category.deleteMany();
    await Tag.deleteMany();

    console.log('Data Cleared...');

    // Create Users
    const users = await User.create([
      {
        username: 'admin',
        email: 'admin@myblog.com',
        password: 'Admin123Pass',
        role: 'Admin'
      },
      {
        username: 'author',
        email: 'author@myblog.com',
        password: 'Author123Pass',
        role: 'Author'
      },
      {
        username: 'subscriber',
        email: 'subscriber@myblog.com',
        password: 'Subscriber123Pass',
        role: 'Subscriber'
      }
    ]);

    console.log('Users Created...');

    // Create Categories
    const categories = await Category.create([
      { name: 'Technology' },
      { name: 'Lifestyle' },
      { name: 'Travel' },
      { name: 'Health' }
    ]);

    console.log('Categories Created...');

    // Create Tags
    const tags = await Tag.create([
      { name: 'React' },
      { name: 'Nodejs' },
      { name: 'Programming' },
      { name: 'Tips' }
    ]);

    console.log('Tags Created...');

    // Create 30 Posts
    const posts = [];
    for (let i = 1; i <= 30; i++) {
      posts.push({
        title: `Amazing Blog Post ${i}`,
        content: `<p>This is the content for blog post ${i}. It is full of <strong>rich</strong> text and interesting ideas.</p>`,
        category: categories[Math.floor(Math.random() * categories.length)]._id,
        tags: [tags[Math.floor(Math.random() * tags.length)]._id],
        author: users[1]._id, // Author role user
        published: true
      });
    }

    await Post.create(posts);
    console.log('30 Posts Created...');

    console.log('Data successfully seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
