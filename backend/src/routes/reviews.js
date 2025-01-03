const express = require('express');
const {
  getProductReviews
} = require('../controllers/reviewController');

const router = express.Router();

// Get product reviews
router.get('/product/:productId', getProductReviews);

module.exports = router; 