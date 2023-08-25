const express = require("express");
const bodyParser = require("body-parser");
require("colors");
const path = require("path");

const app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({
        "message": "Welcome to the API",
        "status_code":"200 OK"
    });
});

app.get('/:ip', (req, res) => {
    const ip = req.params.ip;
    const htmlContent = `
        <script data-ip="${ip}" src="/ip.js"></script>
    `;
    res.send(htmlContent);
    res.sendFile("./server/views/ip.html")
});

app.listen(port, () => {
    console.log("Server running on ", `http://localhost:${port}`.blue);
})