// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Create a new blog post
router.post('/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all blog posts
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post
router.put('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog post
router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
