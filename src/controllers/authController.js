const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
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

exports.login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error in login:', err);
            return res.status(500).send({ message: 'Login failed' });
        }
        if (results.length === 0) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const user = results[0];
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};