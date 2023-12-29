// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Retrieve blogs by category
router.get('/categories/:category', async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.category }).populate('author');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
