const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');
const { protect, seller } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route to view all products
router.get('/', getProducts);

// Protected Route: Must be logged in (protect), must be a seller/admin (seller), and handles 1 image (upload.single)
router.post('/', protect, seller, upload.single('image'), createProduct);

module.exports = router;