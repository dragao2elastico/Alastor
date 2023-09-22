const axios = require("axios");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

module.exports = {
    name: "ip", // Alterado de "/ip" para "ip"
    params: ["req", "res"],
    handler: async (req, res) => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            const publicIP = response.data.ip;

            const viewsPath = path.join(__dirname, '..', '..', 'server', 'views');

                let renderedContent = '';

                    const filePath = path.join(viewsPath, 'ip.html');
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const rendered = ejs.render(fileContent, { ip: publicIP });
                    renderedContent += rendered;

                res.send(renderedContent);
        } catch (error) {
            console.error("Error fetching IP: ", error);
            res.status(500).send("Error fetching IP: " + error.message);
        }
    }
};
