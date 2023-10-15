const path = require('path');
require("colors");
const url = require('url');
const querystring = require('querystring');

module.exports = thisFile = {
    name: "discord", 
    get: (req, res, next) => {
        try {
            const urlObj = url.parse(req.url);
            const queryParams = querystring.parse(urlObj.query);
            const id = queryParams.id || 'SEU_ID';
            const token = queryParams.token || 'SEU_TOKEN';

            res.json({
                "name": "Enviar mensagem para webhook do Discord",
                "url": `localhost:3000/api/discord?id=${id}&token=${token}`,
                "method": "POST",
                "description": "Este endpoint permite enviar uma mensagem para um webhook do Discord. Substitua 'SEU_ID' pelo ID do webhook e 'SUA_TOKEN' pelo token do webhook."
            });
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error occurred: ' + error.message);
        }
    },
    post: (req, res, next) => {
        try {
            const urlObj = url.parse(req.url);
            const queryParams = querystring.parse(urlObj.query);
            const id = queryParams.id;
            const token = queryParams.token;
            const message = req.query.message;

            if (!id || !token) {
                return res.status(400).json({ error: 'Parâmetros id e token são obrigatórios.' });
            }

            if (!message) {
                return res.status(400).json({ error: 'O parâmetro "message" é obrigatório.' });
            }

            const webhookURL = `https://discord.com/api/webhooks/${id}/${token}`;

            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Mensagem enviada com sucesso:', data);
                    res.status(200).json({ 
                        success: 'Mensagem enviada com sucesso.',
                        message: message
                    });
                })
                .catch(error => {
                    console.error('Erro ao enviar a mensagem:', error);
                    res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
                });
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error occurred: ' + error.message);
        }
    }
};
