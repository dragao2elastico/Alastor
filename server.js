const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
require("colors");

const app = express();
const port = 3000;

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
        const clientIP = req.params.ip;

        const response = await axios.get("https://api.ipify.org?format=json");
        const publicIP = response.data.ip;

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>/Ip</title>
                <link rel="stylesheet" href="/style/global.css">
            </head>
            <body>
                <div class="spoiler-container" onclick="toggleSpoiler(this)">
                    Click to show
                    <div class="spoiler-content" id="ip">
                        <hr>
                        Hello, this is your IP address: ${publicIP}
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
    } catch (error) {
        console.error("Error fetching IP: ", error);
        res.status(500).send("Error fetching IP");
    }
});

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/style', express.static(path.join(__dirname, 'server', 'style')));

app.listen(port, () => {
    console.log(`Server running on`, `http://localhost:${port}`.blue);
});
