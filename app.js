// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', blogRoutes);
app.use('/api', categoryRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function fetchCategories() {
    try {
      const response = await fetch('/api/categories');
      const categories = await response.json();
      updateCategoryList(categories);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  }

  function updateCategoryList(categories) {
    const categoryListUl = document.getElementById('category-list-ul');

    categoryListUl.innerHTML = '';

    categories.forEach((category) => {
      const li = document.createElement('li');
      li.textContent = category;
      categoryListUl.appendChild(li);
    });
  }

  document.addEventListener('DOMContentLoaded', fetchCategories);
