const db = require('../config/db');
const { encryptPassword } = require('../utils/crypto');
require('dotenv').config();

exports.register = (req, res) => {
    const { email, password } = req.body;
    const encryptedPassword = encryptPassword(password);

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, encryptedPassword], (err, result) => {
        if (err) {
            console.error('Error in registration:', err);
            return res.status(500).send({ message: 'Registration failed' });
        }
        res.json({ success: true });
    });
};
