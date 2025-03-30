import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

describe('Authentication', () => {

  it('should generate a valid JWT token', () => {
    const payload = { userId: 'user123' };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded.userId).to.equal('user123');
  });

  it('should return an error for expired tokens', (done) => {
    const payload = { userId: 'user123' };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1ms' });

    setTimeout(() => {
      try {
        jwt.verify(token, SECRET_KEY);
      } catch (error) {
        expect(error.name).to.equal('TokenExpiredError');
        done();
      }
    }, 5);
  });

});
