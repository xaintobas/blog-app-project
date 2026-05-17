const express = require('express');
const { getTags, createTag, deleteTag } = require('../controllers/tags');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getTags)
  .post(protect, authorize('Admin'), createTag);

router.route('/:id')
  .delete(protect, authorize('Admin'), deleteTag);

module.exports = router;
