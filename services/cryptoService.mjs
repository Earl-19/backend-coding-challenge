import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from('0123456789abcdef0123456789abcdef', 'utf-8');
const EXPIRY_DURATION = 2000; // In milliseconds (e.g., 2000ms = 2 seconds)

/**
 * Encrypts a message using AES-256-CBC
 * @param {string} message - The message to be encrypted
 * @returns {string} - The encrypted message in the format: base64IV:encryptedMessage:timestamp
 */
export function encryptMessage(message) {
  const iv = crypto.randomBytes(16); // Generate a random 16-byte IV
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(message, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const timestamp = Date.now(); // Current time in milliseconds
  
  return `${iv.toString('base64')}:${encrypted}:${timestamp}`; // Add timestamp to the payload
}

/**
 * Decrypts a message using AES-256-CBC
 * @param {string} payload - The encrypted message in the format: base64IV:encryptedMessage:timestamp
 * @returns {string|null} - The decrypted message or null if decryption fails or message has expired
 */
export function decryptMessage(payload) {
  try {
    const [ivBase64, encrypted, timestamp] = payload.split(':');

    if (!ivBase64 || !encrypted || !timestamp) {
      throw new Error('Invalid payload format. Expected format: base64IV:encryptedMessage:timestamp');
    }

    const iv = Buffer.from(ivBase64, 'base64');
    const decryptedTimestamp = parseInt(timestamp, 10);

    // Checks if the message has expired
    if (Date.now() - decryptedTimestamp > EXPIRY_DURATION) {
      return null; // Message has expired
    }

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('❌ Decryption failed:', error.message);
    return null;
  }
}
