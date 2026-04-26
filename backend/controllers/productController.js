const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    // We will add pagination and search here later!
    const products = await Product.find({});
    res.json(products);
};

// @desc    Create a product (Sellers & Admins only)
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        // If the upload middleware worked, the image URL is stored in req.file.path
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const { name, price, description, brand, category, countInStock } = req.body;

        const product = new Product({
            user: req.user._id, // Gotten from the auth Bouncer!
            name,
            price,
            description,
            brand,
            category,
            countInStock,
            image: req.file.path // The secure Cloudinary URL
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, createProduct };