const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const mailRoutes = require('./src/routes/mailRoutes');
const createUserTable = require('./src/models/userModel');
const createMailTable = require('./src/models/mailModel');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/api/users', userRoutes);
app.use('/api/emails', mailRoutes);

createUserTable();
createMailTable();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
