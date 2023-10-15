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

                    if (event.name) {
                        const endpointName = subfolderName ? `${subfolderName}/${file.replace('.js', '')}` : file.replace('.js', '');
                        switch (true) {
                            case !!event.handler:
                                if (event.preParam) app.get(`/${endpointName}`, event.preParam, event.handler);
                                else app.get(`/${endpointName}`, event.handler);
                                break;
                        
                            case !!event.get:
                                if (event.preParam) app.get(`/${endpointName}`, event.preParam, event.get);
                                else app.get(`/${endpointName}`, event.get);
                                break;
                        
                            case !!event.post:
                                if (event.preParam) app.post(`/${endpointName}`, event.preParam, event.post);
                                else app.post(`/${endpointName}`, event.post);
                                break;
                        
                            case !!event.put:
                                if (event.preParam) app.put(`/${endpointName}`, event.preParam, event.put);
                                else app.put(`/${endpointName}`, event.put);
                                break;
                        
                            case !!event.delete:
                                if (event.preParam) app.delete(`/${endpointName}`, event.preParam, event.delete);
                                else app.delete(`/${endpointName}`, event.delete);
                                break;
                        
                            default:
                                console.warn(`Endpoint ${endpointName} não tem manipuladores de método definidos.`);
                        }
                        
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