const db = require('../config/db');

const createMailTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS emails (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fromUserEmail VARCHAR(255) NOT NULL,
            toUserEmail VARCHAR(255) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            body TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (fromUserEmail) REFERENCES users(email),
            FOREIGN KEY (toUserEmail) REFERENCES users(email)
        )
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Email table created');
    });
};

module.exports = createMailTable;
