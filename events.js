const fs = require("fs");
const path = require("path");
const app = require("./server");
const wait = require('node:timers/promises').setTimeout;

const loadEvents = (app) => {
    const eventsFolderPath = path.join(__dirname, 'events');
    
    const loadEventsFromFolder = (folderPath, subfolderName) => {
        fs.readdir(folderPath, (error, files) => {
            if (error) {
                console.error("Error reading event subfolder:".red, error);
                return;
            }
    
            files.forEach(file => {
                const filePath = path.join(folderPath, file);
                const stats = fs.statSync(filePath);
    
                if (stats.isDirectory()) {
                    console.log("📂 Loading Endpoint Subfolder Events:".yellow, file.replace('.js', ''));
                    loadEventsFromFolder(filePath, subfolderName || file);
                } else if (file.endsWith('.js') && !file.endsWith('.test.js')) {
                    const event = require(filePath);

                    if (subfolderName) {
                        console.log("📒 Successfully loaded Event:".green, `${event.name || file.replace('.js', '')}`, `from`.green, `${subfolderName}`, `endpoint`.green);
                    } else {
                        console.log("📒 Successfully loaded Event:".green, event.name || file.replace('.js', ''));
                    }

                    if (event.name && event.handler) {
                        const endpointName = subfolderName ? `${subfolderName}/${file.replace('.js', '')}` : file.replace('.js', '');
                        app.get(`/${endpointName}`, event.handler);
                    }
    
                    if (event.name && event.get) {
                        const endpointName = subfolderName ? `${subfolderName}/${file.replace('.js', '')}` : file.replace('.js', '');
                        app.get(`/${endpointName}`, event.get);
                    }

                    if (event.name && event.post) {
                        const endpointName = subfolderName ? `${subfolderName}/${file.replace('.js', '')}` : file.replace('.js', '');
                        app.post(`/${endpointName}`, event.post);
                    }

                    if (event.name && event.put) {
                        const endpointName = subfolderName ? `${subfolderName}/${file.replace('.js', '')}` : file.replace('.js', '');
                        app.put(`/${endpointName}`, event.put);
                    }

                    if (event.name && event.delete) {
                        const endpointName = subfolderName ? `${subfolderName}/${file.replace('.js', '')}` : file.replace('.js', '');
                        app.delete(`/${endpointName}`, event.delete);
                    }
                }
            });
        });
    };
    
    const subfolders = fs.readdirSync(eventsFolderPath);
    subfolders.forEach(subfolder => {
        console.log("📁 Loading Event Subfolder:".yellow, subfolder);
        const subfolderPath = path.join(eventsFolderPath, subfolder);
        loadEventsFromFolder(subfolderPath);
    });
};

module.exports = loadEvents;
// if (event.post) {
//     app.post(`/${endpointName}`, event.post);
// } else if (event.put) {
//     app.put(`/${endpointName}`, event.put);
// } else if (event.delete) {
//     app.delete(`/${endpointName}`, event.delete);
// } else {
//     return
// }