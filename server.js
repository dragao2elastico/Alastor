const { formations, log, clear } = require("./functions");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const prompt = require("prompt-sync")();
const fs = require("fs");
const ejs = require("ejs");
require("colors");
const loadEvents = require("./events");
const loginModule = require('./events/pages/login');
const ms = require("ms");
const pkg = require("./package.json");

const version = "1.1.9" || pkg.version;

var askPort = false;

if (askPort === true) port = prompt("Which port you want to create? ");
else if (askPort === false) port = 3000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/scripts', express.static(path.join(__dirname, 'server', 'scripts')));
app.use('/style', express.static(path.join(__dirname, 'server', 'style')));
app.use(express.static(path.join(__dirname, 'server')));

app.get('/', (req, res) => {
    res.redirect('/home');
});


loadEvents(app);
loadErrors();

function loadErrors() {
    app.use((req, res, next) => {
        const statusCode = res.statusCode|| req.statusCode || res.status;

        switch (statusCode) {
            case 404:
                res.sendFile(path.join(__dirname, 'server', 'err', '404.html'));
                break;
            case 500:
                console.error("Internal Server Error:", res.statusMessage);
                res.sendFile(path.join(__dirname, 'server', 'err', '500.html'));
                break;
            case 400:
                res.sendFile(path.join(__dirname, 'server', 'err', '400.html'));
                break;
            case 401:
                res.sendFile(path.join(__dirname, 'server', 'err', '401.html'));
                break;
            case 403:
                res.sendFile(path.join(__dirname, 'server', 'err', '403.html'));
                break;
            case 405:
                res.sendFile(path.join(__dirname, 'server', 'err', '405.html'));
                break;
            case 408:
                res.sendFile(path.join(__dirname, 'server', 'err', '408.html'));
                break;
            case 429:
                res.sendFile(path.join(__dirname, 'server', 'err', '429.html'));
                break;
            case 503:
                res.sendFile(path.join(__dirname, 'server', 'err', '503.html'));
                break;
            case 504:
                res.sendFile(path.join(__dirname, 'server', 'err', '504.html'));
                break;
            default:
                next(); // Passe para o próximo middleware
        }
    });
    console.log("🤖 Successfully loaded".green, "error".red, "pages".green);
}


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
    switch (true) {
        case userAgent.includes('OPR/') || userAgent.includes('Opera GX'):
            console.log(`🖥  User Agent: ${userAgent} (Opera GX)`);
            break;
        case userAgent.includes('Postman'):
            console.log(`📦  User Agent: ${userAgent} (Postman)`);
            break;
        case userAgent.includes('EdgA/'):
            console.log(`🌐  User Agent: ${userAgent} (Microsoft Edge)`);
            break;
        case userAgent.includes('Firefox'):
            console.log(`🔵  User Agent: ${userAgent} (Mozilla Firefox)`);
            break;
        case userAgent.includes('Mozilla'):
            console.log(`🌎  User Agent: ${userAgent} (Mozilla Firefox)`);
            break;
        case userAgent.includes('Chrome'):
            console.log(`⚙️  User Agent: ${userAgent} (Google Chrome)`);
            break;
        case userAgent.includes('Safari'):
            console.log(`🍏  User Agent: ${userAgent} (Safari)`);
            break;
        case userAgent.includes('Xiaomi'):
            console.log(`📱  User Agent: ${userAgent} (Xiaomi)`);
            break;
        case userAgent.includes('Samsung'):
            console.log(`📱  User Agent: ${userAgent} (Samsung)`);
            break;
        case userAgent.includes('iPhone'):
            console.log(`📱  User Agent: ${userAgent} (iPhone)`);
            break;
        default:
            console.log(`🖥  User Agent: ${userAgent} (Unknown Browser or Device)`);
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


app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/login', loginModule.get);
app.post('/login', loginModule.backend);

setTimeout(() => {
    app.use((req, res) => {
        res.status(404).sendFile(path.join(__dirname, 'server', 'err', '404.html'));
    });
}, 5000);

module.exports = { app, version, port };

app.listen(port, () => {
    setTimeout(() => {
        console.log(`💿 ${version}: Server running on:`, `http://localhost:${port}${".".white}`.cyan);
        }, 500);
    }).on('close', function() {
        console.warn(`❌ ${version}: Server stopped.`);
    }).on('uncaughtException', error => {
        if (!error) return false;
            console.error(`❌ ${version}: Uncaught Exception:\n${JSON.stringify({ message: error?.message ?? null })}\n\tStack Trace`)
    }).on('error', error => {
        console.error(`${'❌'.red}: Something went wrong when starting the server.`);
});
