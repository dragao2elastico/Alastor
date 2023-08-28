const path = require('path');
require("colors");

module.exports = {
    name: "", 
    handler: (req, res, next) => {
        try {
            const filePath = path.join(__dirname, `../../server/views/${this.name}`);
            res.sendFile(filePath);
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error ocurred: ' + error.message);
        }
    }
};