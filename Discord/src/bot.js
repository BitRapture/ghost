const FS = require("node:fs");
const { Client, Events, GatewayIntentBits } = require("discord.js");
// Create structure
const Bot = {
    Client : new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] }),
    Config : {
        Tokens : require("./private/tokens.json")
    },
    Commands : {
        Plain : new Map(),
        Slash : new Map()
    }
}

const slashCommandPath = "./commands/slash";
var slashCommandFiles = FS.readdirSync(slashCommandPath).filter(file => file.endsWith(".js"));
for (const file of slashCommandFiles) { file = `${slashCommandPath}${file}` }

const plainCommandPath = "./commands/plain";
var plainCommandFiles = FS.readdirSync(plainCommandPath).filter(file => file.endsWith(".js"));
for (const file of plainCommandFiles) { file = `${plainCommandPath}${file}` }

const allCommandFiles = slashCommandFiles.concat(plainCommandFiles)

for (const commandFile of slashCOmmandFiles) {
    const command = require(commandFile);
    // Inspect if the command is a slash command
    if ("data" in command && "execute" in command) {
        Bot.Commands.Slash.set(command.data.name, command);
    } else if ("execute" in command) {
        Bot.Commands.Plain.set(command.data.name, command);
    }
}

Bot.Client.on("ready", () => {
    console.log(`GHOST > Logged in as: ${Bot.Client.user.tag}`);
    console.log(`GHOST > Loaded ${Bot.Commands.Slash.length} slash commands`);
    console.log(`GHOST > Loaded ${Bot.Commands.Plain.length} plain commands`);
})

Bot.Client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = Bot.Commands.Slash.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.log(err);
    }
})

Bot.Client.login(Bot.Config.Tokens.discord);