const fs = require("fs");
const path = require("path");
const app = require("./server");

// Função para carregar os eventos
const loadEvents = (app) => {
    const eventsFolderPath = path.join(__dirname, 'events');

    // Função recursiva para carregar os eventos de todas as subpastas
    const loadEventsFromFolder = (folderPath) => {
        fs.readdir(folderPath, (error, files) => {
            if (error) {
                console.error("Error reading event subfolder: ".red, error);
                return;
            }

            files.forEach(file => {
                if (!file.endsWith('.js') || file.endsWith('.test.js')) return;
                const event = require(path.join(folderPath, file));
                console.log("📒 Successfully loaded Event: ".green, event.name || file);

                if (event.name && event.handler) {
                    app.get(`/${event.name}`, event.handler);
                }
                
            });
        });
    };

    // Carregar eventos da pasta raiz
    loadEventsFromFolder(eventsFolderPath);

    // Carregar eventos de subpastas recursivamente
    const subfolders = fs.readdirSync(eventsFolderPath);
    subfolders.forEach(subfolder => {
        console.log("📁 Loading Event Subfolder: ".yellow, subfolder);
        const subfolderPath = path.join(eventsFolderPath, subfolder);
        loadEventsFromFolder(subfolderPath);
    });
};

module.exports = loadEvents;
