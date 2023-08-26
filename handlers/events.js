const fs = require("fs");
const path = require("path");

// Função para carregar os eventos
const loadEvents = (app) => {
    fs.readdir(`./events`, (error, folders) => {
        if (error) {
            console.error("Error reading events folder: ", error);
            return;
        }

        folders.forEach(folder => {
            const folderPath = path.join(__dirname, folder);
            console.log("📁 Loading Event Subfolder: ".blue, folder);
            
            fs.readdir(folderPath, (error, files) => {
                if (error) {
                    console.error("Error reading event subfolder: ", error);
                    return;
                }

                files.forEach(file => {
                    if (!file.endsWith('.js') || file.endsWith('.test.js')) return;
                    const event = require(path.join(folderPath, file));
                    console.log("📒 Loaded Event: ".green, event.name || file);

                    // Certifique-se de que o arquivo do evento exporta um objeto com 'name' e 'params'
                    if (event.name && event.params) {
                        app.on(event.name, event.handler); // Associe o evento ao Express app
                    }
                });
            });
        });
    });
};

module.exports = loadEvents;
