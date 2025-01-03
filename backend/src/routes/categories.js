const express = require('express');
const {
  getAllCategories,
  getCategoryById,
} = require('../controllers/categoryController');

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

// Get category by id
router.get('/:id', getCategoryById);


module.exports = router; 