const express = require('express');
const router = express.Router();
const { storeMessage, getMessages } = require('../controllers/messageController');
const { debugDecrypt } = require('../debug/debug_code');

router.post('/messages', storeMessage);
router.get('/messages/:userId', getMessages);
router.post('/debug/decrypt', debugDecrypt);

module.exports = router;
