const db = require('../config/db');

exports.sendEmail = (req, res) => {
    const { to, subject, body } = req.body;
    const fromUserEmail = req.user.email;

    const sql = 'INSERT INTO emails (fromUserEmail, toUserEmail, subject, body) VALUES (?, ?, ?, ?)';
    db.query(sql, [fromUserEmail, to, subject, body], (err, result) => {
        if (err) {
            console.error('Error sending email:', err);
            return res.status(500).send({ message: 'Failed to send email' });
        }
        res.json({ success: true });
    });
};