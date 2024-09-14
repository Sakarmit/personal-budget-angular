// Budget API

const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/budget', (req, res) => {
    res.sendFile(__dirname + '\\data.json');
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});