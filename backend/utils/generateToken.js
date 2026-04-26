const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    // 1. Create the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // 2. Send it as an HttpOnly cookie
    res.cookie('jwt', token, {
        httpOnly: true, // Prevents hackers from stealing it via JavaScript (XSS)
        secure: process.env.NODE_ENV !== 'development', // In production, requires HTTPS
        sameSite: 'strict', // Prevents CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
    });
};

module.exports = generateToken;