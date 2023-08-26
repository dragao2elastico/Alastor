const app = require("../../index");
const fs = require("fs");
const axios = require("axios");

app.get('/:ip', async (req, res) => {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        const publicIP = response.data.ip;

        const viewsPath = path.join(__dirname, 'server', 'views');
        
        // Lê todos os arquivos da pasta views
        fs.readdir(viewsPath, (err, files) => {
            if (err) {
                console.error("Error reading views folder: ", err);
                res.status(500).send("Error reading views folder");
                return;
            }
            
            let renderedContent = '';

            // Itera pelos arquivos e renderiza cada um usando o EJS
            files.forEach(file => {
                const filePath = path.join(viewsPath, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const rendered = ejs.render(fileContent, { ip: publicIP });
                renderedContent += rendered;
            });

            res.send(renderedContent);
        });
    } catch (error) {
        console.error("Error fetching IP: ", error);
        res.status(500).send("Error fetching IP: " + error.message);
    }
});