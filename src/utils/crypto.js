const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32); 
const iv = Buffer.alloc(16, 0); 

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};


const encryptEmailBody = (text) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decryptEmailBody = (encryptedText) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {
    encryptPassword,
    encryptEmailBody,
    decryptEmailBody
};
