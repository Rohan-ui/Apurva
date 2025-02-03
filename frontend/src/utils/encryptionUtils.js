// encryptionUtils.js
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'your-32-char-encryption-key'; // Must match the backend key

// Function to encrypt data
export const encrypt = (text) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return iv.toString() + ':' + encrypted.toString(); // Returning iv and encrypted data
};

// Function to decrypt data
export const decrypt = (text) => {
  const textParts = text.split(':');
  const iv = CryptoJS.enc.Hex.parse(textParts.shift());
  const encryptedText = CryptoJS.enc.Hex.parse(textParts.join(':'));
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedText }, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
