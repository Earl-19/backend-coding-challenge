const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from('0123456789abcdef0123456789abcdef', 'utf-8'); 

function fixed_decrypt(payload) {
  try {
    const [ivBase64, encrypted] = payload.split(':');

    // Checks if both IV and encrypted message exist
    if (!ivBase64 || !encrypted) {
      throw new Error('Invalid payload format. Expected base64IV:encryptedMessage');
    }

    // Decodes the IV
    const iv = Buffer.from(ivBase64, 'base64');

    // Checks if IV length is correct
    if (iv.length !== 16) {
      throw new Error(`Invalid IV length: ${iv.length} (expected 16 bytes)`);
    }

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return `❌ Decryption failed: ${err.message}`;
  }
}

function debugDecrypt(req, res) {
  const { payload } = req.body;
  const result = fixed_decrypt(payload);
  res.json({ result });
}

module.exports = { debugDecrypt };
