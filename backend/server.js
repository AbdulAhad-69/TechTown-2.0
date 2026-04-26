const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db'); // Import our new DB file

// Connect to the database FIRST
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true})); // Allow requests from our frontend and send cookies
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(cookieParser()); // Parse cookies

// Connect our auth routes to the /api/auth path
app.use('/api/auth', require('./routes/authRoutes'));

// Add this under app.use('/api/auth', ...);
app.use('/api/products', require('./routes/productRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});