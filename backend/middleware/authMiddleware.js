const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. The "Logged In" Bouncer
const protect = async (req, res, next) => {
    let token;

    // Read the JWT from the 'jwt' cookie we set earlier
    token = req.cookies.jwt;

    if (token) {
        try {
            // Crack open the token using our secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database, but DO NOT return their password
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // VIP pass is good! Let them into the route.
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// 2. The "Admin Only" Bouncer
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // They are an admin, let them through
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

// 3. The "Seller Only" Bouncer
const seller = (req, res, next) => {
    // Admins can also do seller things, so we allow both
    if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a seller' });
    }
};

module.exports = { protect, admin, seller };