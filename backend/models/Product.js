const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This links the product to the Seller who uploaded it
    },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    image: { type: String, required: true }, // This will hold the Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);