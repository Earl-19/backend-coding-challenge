const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'xj-=_()!@#$%jke'; 

//  Generate JWT Token
router.post('/generate-token', (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Missing userId.' });

    // Create payload with user information
    const payload = { userId };

    // Generate token with 1-hour expiration
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
});

module.exports = router;
