const express = require('express');
const { getPosts, getPostBySlug, createPost, updatePost, deletePost } = require('../controllers/posts');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getPosts)
  .post(protect, authorize('Author', 'Admin'), createPost);

router.route('/:id')
  .put(protect, authorize('Author', 'Admin'), updatePost)
  .delete(protect, authorize('Author', 'Admin'), deletePost);

router.get('/slug/:slug', getPostBySlug);

module.exports = router;
