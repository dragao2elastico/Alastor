const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const prompt = require("prompt-sync")();
const ejs = require("ejs");
require("colors");

var askPort = false;

if (askPort === true) port = prompt("Which port you want i create? ")
else if (askPort === false) port = 3000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({
        "message": "Welcome to the API",
        "status_code": "200 OK"
    });
});

app.get('/:ip', async (req, res) => {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        const publicIP = response.data.ip;

        // Renderize o arquivo HTML usando o EJS e passe os dados dinâmicos
        ejs.renderFile(path.join(__dirname, 'ip.html'), { ip: publicIP }, (err, html) => {
            if (err) {
                console.error("Error rendering HTML: ", err);
                res.status(500).send("Error rendering HTML");
            } else {
                res.send(html);
            }
        });
    } catch (error) {
        console.error("Error fetching IP: ", error);
        res.status(500).send("Error fetching IP");
    }
});

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/style', express.static(path.join(__dirname, 'server', 'style')));

app.listen(port, () => {
    console.log(`Server running on:`, `http://localhost:${port}`.blue);
});
