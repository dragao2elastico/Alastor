const fs = require("fs");
const path = require("path");
require("colors");

const characters = [
    {
        name: "Alastor",
        description: "Descrição do Alastor, um personagem misterioso e carismático.",
        link: `/bests/alastor`
    },
    {
        name: "Ralsei",
        description: "Descrição do Ralsei, um pacifista e membro do grupo no jogo Deltarune.",
        link: `/bests/ralsei`
    },
    {
        name: "The Lamb",
        description: "Descrição do personagem The Lamb, conhecida por sua aparência angelical e demoníaca.",
        link: `/bests/lamb`
    },
    {
        name: "Vaporeon",
        description: "Descrição do Vaporeon, uma das evoluções do Eevee no universo Pokémon.",
        link: `/bests/vaporeon`
    },
];

module.exports = {
    name: "bests", 
    get: (req, res, next) => {
        try {
            const characterList = characters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p>${character.description}</p>
                    <a href="${character.link}"><button class="view-button" >Ver mais</button></a>
                </div>
            `).join('');

            const filePath = path.join(__dirname, '../../server/views/bests.html');
            fs.readFile(filePath, 'utf-8', (error, content) => {
                if (error) {
                    console.error("Error reading bests.html: ".red, error);
                    res.status(500).send("An error ocurred: " + error.message);
                } else {
                    const updatedContent = content.replace('<!-- characterList -->', characterList);
                    res.send(updatedContent);
                }
            });
        } catch (error) {
            console.error("An Error Occurred: ".red, error);
            res.status(500).send("An error ocurred: " + error.message);
        }
    }
};