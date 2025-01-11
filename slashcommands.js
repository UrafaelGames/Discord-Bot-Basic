const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client } = require('discord.js');
const {  token } = require(`${process.cwd()}/config.json`);

const slash = [];

const clientId = '1082458476585947156';
const slashFolders = fs.readdirSync('./slashcmd');
for (const folder of slashFolders) {
const slashFiles = fs.readdirSync(`./slashcmd/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of slashFiles) {
        const command = require(`./slashcmd/${folder}/${file}`);
  slash.push(command.data.toJSON())
}
}


const rest = new REST({ version: '10' }).setToken("");

(async () => {
    try {
        console.log(`Started refreshing ${slash.length} application (/) commands.`);

    await rest.put(
    Routes.applicationCommands(clientId),
    { body: slash },
);
        console.log(`Successfully reloaded ${slash.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
