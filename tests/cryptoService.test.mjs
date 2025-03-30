import { expect } from 'chai';
import { encryptMessage, decryptMessage } from '../services/cryptoService.mjs';

describe('Crypto Service', () => {

  it('should encrypt and decrypt a message correctly', () => {
    const originalMessage = 'Hello, World!';
    const encryptedMessage = encryptMessage(originalMessage);
    const decryptedMessage = decryptMessage(encryptedMessage);
    expect(decryptedMessage).to.equal(originalMessage);
  });

  it('should return null for invalid decryption', () => {
    // Temporarily suppress console.error during this test
    const originalConsoleError = console.error;
    console.error = () => {};

    const invalidPayload = 'invalid:payload';
    const result = decryptMessage(invalidPayload);
    
    // Restore console.error after test
    console.error = originalConsoleError;

    expect(result).to.be.null;
});


});
