const { encryptMessage, decryptMessage } = require('../services/cryptoService');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../storage/messages.json');
const MESSAGE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Read messages from file
function readMessagesFromFile() {
  try {
    if (!fs.existsSync(filePath)) return {};
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading messages from file:', error.message);
    return {};
  }
}

// Write messages to file
function writeMessagesToFile(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing messages to file:', error.message);
  }
}

// Store Encrypted Message
exports.storeMessage = (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) return res.status(400).json({ error: 'Missing userId or message' });

  const encrypted = encryptMessage(message);
  const messages = readMessagesFromFile();

  if (!messages[userId]) messages[userId] = [];
  messages[userId].push({ encrypted, timestamp: Date.now() });

  writeMessagesToFile(messages);
  res.status(201).json({ message: 'Message stored securely.' });
};

// Retrieve Decrypted Messages
exports.getMessages = (req, res) => {
  const { userId } = req.params;
  const messages = readMessagesFromFile();

  if (!messages[userId]) return res.status(404).json({ error: 'No messages found.' });

  const currentTime = Date.now();
  const validMessages = messages[userId].filter(msg => currentTime - msg.timestamp <= MESSAGE_EXPIRATION_MS);

  // Update storage with only valid messages
  messages[userId] = validMessages;
  writeMessagesToFile(messages);

  const decryptedMessages = validMessages.map(({ encrypted }) => decryptMessage(encrypted) || "Failed to decrypt message");

  res.status(200).json({ messages: decryptedMessages });
};

// Decryption Endpoint (for Debugging)
exports.debugDecrypt = (req, res) => {
  const { payload } = req.body;
  if (!payload) return res.status(400).json({ error: 'Missing payload' });

  const result = decryptMessage(payload);
  if (result === null) {
    res.status(400).json({ error: 'Decryption failed.' });
  } else {
    res.status(200).json({ result });
  }
};
