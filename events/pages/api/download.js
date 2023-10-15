const path = require('path');
const fs = require('fs');
require("colors");

module.exports = thisFile = {
    name: "download",
    get: (req, res, next) => {
        try {
            const filename = req.params.filename;
            const filePath = path.join(__dirname, `../../../server/uploads/${filename}`);

            if (fs.existsSync(filePath)) {
                res.download(filePath, (err) => {
                    if (err) {
                        console.error(`Erro ao baixar o arquivo ${filename}: ${err}`.red);
                        res.status(500).json({ error: 'Erro ao baixar o arquivo.' });
                    } else {
                        console.log(`Arquivo ${filename} baixado com sucesso.`.green);
                    }
                });
            } else {
                res.status(404).json({ error: 'Arquivo não encontrado.' });
            }
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error occurred: ' + error.message);
        }
    }
};
