const path = require('path');

module.exports = {
    name: 'home',
    get: (req, res, next) => {
        try {
            const filePath = path.join(__dirname, '../../server/views/home.html');
            res.sendFile(filePath);
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error ocurred: ' + error.message);
        }
    }
};
