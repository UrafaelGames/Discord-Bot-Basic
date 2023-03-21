const Discord = require("discord.js");
const intents = new Discord.Intents();
const client = new Discord.Client({ intents: 131071 });



client.on("ready", () => {

    const estados = [
        {
            tipo: "PLAYING", //Watching, Listering
            contenido: "Programando",
            opcionestado: "on" //DND, ON, IDLE
        },
        {
            tipo: "WATCHING",
            contenido: "Construyendo el codigo",
            opcionestado: "on"
        },
        {
            tipo: "WATCHING",
            contenido: "A Urafael",
            opcionestado: "on"
        }
    ];

    async function arctivarestado() {
        const estado = Math.floor(Math.random() * estados.length);

        try{
            await client.user.setPresence({
                activities:[
                    {
                        name:estados[estado].contenido,
                        type:estados[estado].tipo
                    },
                ],
                status: estados[estado].opcionestado
            });

        } catch (error) {
            console.error[error];
        }
    }
    setInterval(arctivarestado,20000);
    console.log("¡ESTADOS ACTIVADOS!.");
    console.log("¡EL BOT ESTA LISTO, PAPU!")
});

const fs = require("fs");
let { readdirSync } = require("fs");

client.commands = new Discord.Collection();
const commandsFiles = fs.readdirSync("./comandos").filter(file => file.endsWith(".js"))

for(const file of commandsFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command)
    console.log(`Comando cargado: ${file}`)
}

client.slashcommands = new Discord.Collection();
const slashFolders = fs.readdirSync("./slashcmd")
for (const folder of slashFolders) {
const slashFiles =  fs.readdirSync(`./slashcmd/${folder}`).filter(file => file.endsWith('.js'));
   for (const file of slashFiles) {
    const command = require(`./slashcmd/${folder}/${file}`);
    client.slashcommands.set(command.data.name, command)
}
}

client.on("interactionCreate", async(interaction) => {
    if(!interaction.isCommand()) return;

    const slashcmds = client.slashcommands.get(interaction.commandName)

    if(!slashcmds) return;

    try{
        await slashcmds.run(client, interaction)
    } catch(e) {
        console.error(e)
    }
})

client.on("messageCreate", (message) => {

    const prefix = "??"

if(message.author.bot) return;

if(message.channel.type === "dm") return;

if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.include(command));

if(cmd){
    cmd.execute(client, message, args)
}

});

client.login("MTA4MjQ1ODQ3NjU4NTk0NzE1Ng.GjL3aq.CwKened--_aOnMdOSUnmClUjXpOPWZd0-cpDb8");