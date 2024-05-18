const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.post('/', mailController.sendEmail);
router.get('/', authenticateToken, mailController.getEmails);

module.exports = router;