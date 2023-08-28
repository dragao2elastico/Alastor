const path = require('path');
require('colors');

module.exports = {
    name: "about",
    handler: (req, res, next) => {
        try {
            const filePath = path.join(__dirname, `../../server/views/${name}.html`);
            res.sendFile(filePath);
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error occurred: ' + error.message);
        }
    }
};
