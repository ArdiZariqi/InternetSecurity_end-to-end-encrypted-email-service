const bcrypt = require('bcrypt');
require('dotenv').config();

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

module.exports = {
    encryptEmailBody,
    encryptPassword
};
