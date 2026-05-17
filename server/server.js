const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Force Google DNS to fix SRV record lookup issues
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: true,
  credentials: true,
}));

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const posts = require('./routes/posts');
const categories = require('./routes/categories');
const tags = require('./routes/tags');
const upload = require('./routes/upload');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/categories', categories);
app.use('/api/v1/tags', tags);
app.use('/api/v1/upload', upload);

app.get('/', (req, res) => {
  res.send('Blog API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
