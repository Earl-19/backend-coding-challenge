// routes/debugRoutes.js

const express = require('express');
const router = express.Router();
const { debugDecrypt } = require('../controllers/messageController');

// POST /debug/decrypt (Route for decrypting messages)
router.post('/decrypt', debugDecrypt);

module.exports = router;
