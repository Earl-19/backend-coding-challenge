# Secure Messenger API

## 📖 Project Description

Secure Messenger API is a backend service designed to provide encrypted messaging functionality using AES-256 encryption. It ensures data integrity and confidentiality by utilizing strong encryption algorithms. Additionally, the system supports token-based authentication and message expiration.

## 🚀 Features
- 🔒 AES-256-CBC Encryption and Decryption
- 🔑 JWT Token Authentication for Secure Access
- ⏳ Message Expiration Handling
- 📂 File-based Storage System
- ✅ Comprehensive Unit Testing

## 📂 Folder Structure
```
secure-messenger-api/
├── controllers/
├── routes/
├── services/
├── storage/
├── tests/
│   ├── auth.test.mjs
│   ├── cryptoService.test.mjs
│   ├── fileHandling.test.mjs
│   ├── messageExpiry.test.mjs
├── .env
├── app.js
├── package.json
├── README.md
```

## 📦 Installation
1. Clone the repository:
```
git clone https://github.com/YourUsername/secure-messenger-api.git
```
2. Navigate to the project directory:
```
cd secure-messenger-api
```
3. Install dependencies:
```
npm install
```
4. Create a `.env` file in the root directory and define the following:
```
SECRET_KEY=your_secret_key
PORT=3000
```

## 📌 Usage
Start the server:
```
npm start
```
The server will run at: `http://localhost:3000`

## 🔑 Authentication
All endpoints are protected by JWT authentication. Ensure you provide a valid token in the `Authorization` header.

## 📄 API Documentation
### 1. Store Message (Encryption)
```
POST /messages
```
Body:
```json
{
  "userId": "user123",
  "message": "Your message here"
}
```
Response:
```json
{
  "message": "Message stored securely."
}
```

### 2. Retrieve Messages (Decryption)
```
GET /messages/:userId
```
Response:
```json
{
  "messages": [ "Decrypted Message 1", "Decrypted Message 2" ]
}
```

### 3. Debug Decryption
```
POST /debug/decrypt
```
Body:
```json
{
  "payload": "encryptedPayload"
}
```
Response:
```json
{
  "result": "Decrypted message or error message"
}
```

### 4. Token Generation
JWT tokens are generated using:
```javascript
jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
```


## 🧪 Testing
To run all tests:
```
npm test
```
Test Coverage:
- **Authentication Tests**
- **Crypto Service Tests**
- **File Handling Tests**
- **Message Expiry Tests**


## 📌 Deployment
1. Ensure your `.env` file is configured correctly.
2. Push your code to a hosting platform like **Heroku, Vercel, or DigitalOcean**.
3. Set environment variables (e.g., `SECRET_KEY`, `PORT`) on your hosting platform.

### Deploy to Heroku Example:
```
heroku login
heroku create
heroku config:set SECRET_KEY=your_secret_key PORT=3000
```


## 💡 Design Decisions & Considerations
- Implemented using Node.js with ES Modules for modern JavaScript compatibility.
- Used `crypto` module for AES-256-CBC encryption.
- Token-based authentication implemented with `jsonwebtoken`.
- Included comprehensive testing using `Mocha` and `Chai`.
- Stored messages in JSON format to simulate a database.


## 📥 Submission Process
1. **Fork the Repository**: [Repository Link](https://github.com/waleedahmed0710/backend-coding-challenge)
2. **Push Your Code** to your forked repository.
3. **Create a Pull Request (PR)** to the original repository following the guidelines provided.
4. **Add Notes or Comments** about your design decisions and any trade-offs you made.


## 📞 Contact
If you have any questions or need further assistance, feel free to reach out.
0619668429
earlinnocent@gmail.com

