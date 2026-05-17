const Tag = require('../models/Tag');

// @desc    Get all tags
// @route   GET /api/v1/tags
// @access  Public
exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({ success: true, count: tags.length, data: tags });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create tag
// @route   POST /api/v1/tags
// @access  Private (Admin)
exports.createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ success: true, data: tag });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete tag
// @route   DELETE /api/v1/tags/:id
// @access  Private (Admin)
exports.deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ success: false, error: 'Tag not found' });
    await tag.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
