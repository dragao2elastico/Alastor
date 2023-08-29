const path = require('path');
const jwt = require('jsonwebtoken');
require('colors');

// Usuários simulados
const users = [
    { username: 'admin', password: 'adm' },
    { username: 'user', password: 'us2' }
];

module.exports = {
    name: 'login',
    handler: (req, res, next) => {
        try {
            const filePath = path.join(__dirname, `../../server/views/${thisFile.name}.html`);
            res.sendFile(filePath);
        } catch (error) {
            console.error('An Error Occurred: '.red, error);
            res.status(500).send('An error occurred: ' + error.message);
        }
    },
    backend: (req, res) => {
        const { username, password } = req.body;

        // Encontra o usuário correspondente
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Gera um token de autenticação
            const token = jwt.sign({ username: user.username }, 'seuSegredoAqui');

            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    }
};
