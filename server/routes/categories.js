const express = require('express');
const { getCategories, createCategory, deleteCategory } = require('../controllers/categories');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getCategories)
  .post(protect, authorize('Admin'), createCategory);

router.route('/:id')
  .delete(protect, authorize('Admin'), deleteCategory);

module.exports = router;
