import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../storage/messages.json');

describe('File Handling', () => {

  it('should read messages from file', () => {
    const data = fs.readFileSync(filePath, 'utf8');
    expect(data).to.be.a('string');
  });

  it('should write messages to file', () => {
    const testData = { test: "This is a test" };
    fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));

    const readData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    expect(readData).to.deep.equal(testData);
  });

});
