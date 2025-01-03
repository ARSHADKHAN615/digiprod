const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get featured products
router.get('/featured', productController.getFeaturedProducts);

// Get trending products
router.get('/trending', productController.getTrendingProducts);

// Search products
router.get('/search', productController.searchProducts);

// Get single product
router.get('/:id', productController.getProductById);

// Get similar products
router.get('/similar/:categoryId', productController.getSimilarProducts);

module.exports = router;