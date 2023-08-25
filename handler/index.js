const fs = require("fs");
require("colors");

module.exports = async (client) => {

const SlashsArray = []

  fs.readdir(`./commands`, (error, folder) => {
  folder.forEach(subfolder => {
fs.readdir(`./commands/${subfolder}/`, (error, files,) => { 
  console.log("📁Subpasta ", subfolder.blue, " está sendo carregada.");
  files.forEach(files => {
      
  if(!files?.endsWith('.js') || files?.endsWith('.test.js')) return;
  files = require(`../commands/${subfolder}/${files}`);
  if(!files?.name) return;
  client.slashCommands.set(files?.name, files);
  console.log("📒Arquivo", files.name, "carregado com ","êxito".green,"!");

  SlashsArray.push(files)
  });
    });
  });
});
  client.on("ready", async () => {
  client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray))
    });
};