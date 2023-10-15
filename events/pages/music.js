const path = require('path');

module.exports = {
    name: 'music',
    get: (req, res, next) => {
        try {
            const filePath = path.join(__dirname, '../../server/views/player.html');
            res.sendFile(filePath);
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error ocurred: ' + error.message);
        }
    }
};
