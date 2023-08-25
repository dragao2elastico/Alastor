const express = require("express");
const bodyParser = require("body-parser");
require("colors");
const path = require("path");

const app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

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
    // res.send(`Ip Grabber\n`);
    const ip = req.params.ip;
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>/Ip</title>
            <style></style>
            <link rel="stylesheet" href="/style/global.css">
        </head>
        <body>
            <div class="spoiler-container" onclick="toggleSpoiler(this)">
                Click to show
                <div class="spoiler-content" id="ip">
                    Hello, this is your IP address: ${req.params.ip}
                </div>
            </div>

            <script>
                function toggleSpoiler(spoiler) {
                    spoiler.classList.toggle("show");
                }
            </script>
        </body>
        </html>
    `;
    
    res.send(htmlContent);
});

app.get('/scripts/ip.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'ip.js'));
});

app.get('/style/global.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'server', 'style', 'global.css'));
});

app.listen(port, () => {
    console.log("Server running on ", `http://localhost:${port}`.blue);
})