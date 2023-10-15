const path = require('path');
require("colors");

module.exports = thisFile = {
    name: "", 
    get: (req, res, next) => {
        try {
            const filePath = path.join(__dirname, `../../server/views/${thisFile.name}.html`);
            res.sendFile(filePath);
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error ocurred: ' + error.message);
        }
    },
    post: (req, res, next) => {
        try {
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error ocurred: ' + error.message);
        }
    },
    put: (req, res, next) => {
        try {
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error ocurred: ' + error.message);
        }
    },
    delete: (req, res, next) => {
        try {
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error ocurred: ' + error.message);
        }
    },
};

// const path = require('path');
// require("colors");

// module.exports = thisFile = {
//     name: "", 
//     get: (req, res, next) => {
//         try {
//             const filePath = path.join(__dirname, `../../server/views/${thisFile.name}.html`);
//             res.sendFile(filePath);
//         } catch (error) {
//             console.error('An Error Occurred: '.red, error);
//             res.status(500).send('An error ocurred: ' + error.message);
//         }
//     }
// };