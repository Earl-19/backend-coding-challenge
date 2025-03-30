import { expect } from 'chai';
import { encryptMessage, decryptMessage } from '../services/cryptoService.mjs';

// Increase the timeout to 5000ms for this test
describe('Message Expiry', function() {

  this.timeout(5000);

  it('should expire messages after a certain time', (done) => {
    const originalMessage = 'This is a temporary message';
    const encryptedMessage = encryptMessage(originalMessage);

    // Wait for 3 seconds before trying to decrypt
    setTimeout(() => {
      const decryptedMessage = decryptMessage(encryptedMessage);
      expect(decryptedMessage).to.be.null; // Expecting null because the message should be expired
      done();
    }, 3000);
  });

});
