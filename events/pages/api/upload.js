const path = require('path');
require("colors");
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
module.exports = thisFile = {
    name: "upload", 
    preParam: upload.single('file'),
    get: (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
            }

            const { originalname, filename } = req.file;
            console.log(`Arquivo ${originalname} (${filename}) foi enviado com sucesso.`.green);
            res.json({ message: 'Arquivo enviado com sucesso!' });
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
    }
};