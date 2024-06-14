const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

if (!process.env.ENCRYPTION_KEY) {
    throw new Error('Missing ENCRYPTION_KEY in environment variables');
}

const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const encryptEmailBody = (text) => {
    const iv = crypto.randomBytes(16); 
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log('Generated IV:', iv.toString('hex')); 
    return iv.toString('hex') + ':' + encrypted; 
};

const decryptEmailBody = (encryptedText) => {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts[0], 'hex'); 
    const encrypted = textParts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {
    encryptPassword,
    encryptEmailBody,
    decryptEmailBody
};
