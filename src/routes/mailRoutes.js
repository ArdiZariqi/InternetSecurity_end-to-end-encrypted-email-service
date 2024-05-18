const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, mailController.sendEmail);
router.get('/', authenticateToken, mailController.getEmails);

module.exports = router;