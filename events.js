const fs = require("fs");
const path = require("path");
const app = require("./server");

const loadEvents = (app) => {
    const eventsFolderPath = path.join(__dirname, 'events');
    
    const loadEventsFromFolder = (folderPath, subfolderName) => {
        fs.readdir(folderPath, (error, files) => {
            if (error) {
                console.error("Error reading event subfolder: ".red, error);
                return;
            }
    
            files.forEach(file => {
                const filePath = path.join(folderPath, file);
                const stats = fs.statSync(filePath);
    
                if (stats.isDirectory()) {
                    console.log("📂 Loading Endpoint Subfolder Events: ".yellow, file);
                    loadEventsFromFolder(filePath, subfolderName || file);
                } else if (file.endsWith('.js') && !file.endsWith('.test.js')) {
                    const event = require(filePath);

                    if (subfolderName) {
                        console.log("📒 Successfully loaded endpoint Event: ".green, `${subfolderName}/${event.name || file}`);
                    } else {
                        console.log("📒 Successfully loaded Event: ".green, event.name || file);
                    }
    
                    if (event.name && event.handler) {
                        const endpointName = subfolderName ? `${subfolderName}/${file.replace('.js', '')}` : file.replace('.js', '');
                        app.get(`/${endpointName}`, event.handler);
                    }
                }
            });
        });
    };
    
    const subfolders = fs.readdirSync(eventsFolderPath);
    subfolders.forEach(subfolder => {
        console.log("📁 Loading Event Subfolder: ".yellow, subfolder);
        const subfolderPath = path.join(eventsFolderPath, subfolder);
        loadEventsFromFolder(subfolderPath);
    });
};

module.exports = loadEvents;
