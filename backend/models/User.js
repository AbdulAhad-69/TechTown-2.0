const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // No duplicate emails allowed
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['customer', 'seller', 'admin'], // These are the ONLY allowed roles
            default: 'customer',
        },
        phone: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        }
    },
    {
        timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
    }
);

// Export the model so we can use it in other files
module.exports = mongoose.model('User', userSchema);