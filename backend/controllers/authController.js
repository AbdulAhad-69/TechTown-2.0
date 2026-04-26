const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer', // Default to customer if no role is provided
        });

        if (user) {
            generateToken(res, user._id); // Give them the cookie
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });

        // 2. Check if user exists AND password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            generateToken(res, user._id); // Give them the cookie
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
    // req.user is provided by our 'protect' middleware!
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { registerUser, loginUser, getMe };