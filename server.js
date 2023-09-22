const { formations, log, loadErrors, clear } = require("./functions");
clear()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const prompt = require("prompt-sync")();
const fs = require("fs");
const ejs = require("ejs");
require("colors");
const loadEvents = require("./events");
const loginModule = require('./events/pages/login');

const version = "1.1.2";

var askPort = false;

if (askPort === true) port = prompt("Which port you want i create? ");
else if (askPort === false) port = 3000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/scripts', express.static(path.join(__dirname, 'server', 'scripts')));
app.use('/style', express.static(path.join(__dirname, 'server', 'style')));
app.use(express.static(path.join(__dirname, 'server')));

app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).send(`Something went wrong! Error: ${err.message}`);
});

app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const userAgent = req.headers['user-agent'];
    const requestMethod = req.method;
    const requestUrl = req.url;

    console.log(`👤 Client connected from IP: ${clientIp}`);
    if (userAgent.includes('OPR/') || userAgent.includes('Opera GX')) {
        console.log(`🖥  User Agent: ${userAgent} (Opera GX)`);
    } else {
        console.log(`🖥  User Agent: ${userAgent}`);
    }
    console.log(`🗨  Request Method: ${requestMethod}`);
    console.log(`🔗 Request URL: ${requestUrl}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'X-Custom-Header');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Custom-Header');
    res.setHeader('Access-Control-Max-Age', '3600');

    next();
});

loadEvents(app);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/login', loginModule.handler);
app.post('/login', loginModule.backend);

loadErrors();

module.exports = { app, version };

app.listen(port, () => {
    console.log(`💿 Server running on:`, `http://localhost:${port}`.cyan);
});
