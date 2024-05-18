const db = require('../config/db');
const { encryptEmailBody, decryptEmailBody } = require('../utils/crypto');

exports.sendEmail = (req, res) => {
    const { to, subject, body } = req.body;
    const fromUserEmail = req.user.email;
    const encryptedBody = encryptEmailBody(body);
    const encryptedSubject = encryptEmailBody(subject);

    const sql = 'INSERT INTO emails (fromUserEmail, toUserEmail, subject, body) VALUES (?, ?, ?, ?)';
    db.query(sql, [fromUserEmail, to, encryptedSubject, encryptedBody], (err, result) => {
        if (err) {
            console.error('Error sending email:', err);
            return res.status(500).send({ message: 'Failed to send email' });
        }
        res.json({ success: true });
    });
};

exports.getEmails = (req, res) => {
    const userEmail = req.user.email;
    const sql = 'SELECT * FROM emails WHERE toUserEmail = ?';

    db.query(sql, [userEmail], (err, results) => {
        if (err) {
            console.error('Error retrieving emails:', err);
            return res.status(500).send({ message: 'Failed to retrieve emails' });
        }
        const emails = results.map(email => ({
            ...email,
            body: decryptEmailBody(email.body), subject: decryptEmailBody(email.subject)
        }));
        res.json({ emails });
    });
};