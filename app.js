//  app.js - Main Server Setup with Authentication and Message Expiry

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const messageRoutes = require('./routes/messageRoutes');
const debugRoutes = require('./routes/debugRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY; // Ensure this is set in your .env file

app.use(bodyParser.json());

// 🔑 Middleware for Token Verification
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = user;
        next();
    });
}

// 🔑 Route to Generate JWT Token
app.post('/generate-token', (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Missing userId.' });

    const payload = { userId };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
});

//  Mounting Routes
app.use('/messages', authenticateToken, messageRoutes); // Protect message routes
app.use('/debug', debugRoutes); // Debug routes can remain unprotected or add authentication as needed

//  Home Route
app.get('/', (req, res) => {
    res.send('🔐 Secure Messaging API is running!');
});

// 🔍 Handle favicon request
app.get('/favicon.ico', (req, res) => res.status(204).end());

// ❌ Handle Invalid Routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

//  Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
