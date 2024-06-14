const crypto = require('crypto');

const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

const generateEncryptionKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

console.log('JWT_SECRET:', generateJWTSecret());
console.log('ENCRYPTION_KEY:', generateEncryptionKey());
