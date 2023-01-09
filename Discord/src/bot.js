const { Client, GatewayIntentBits } = require("discord.js");
const Bot = {
    Client : new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] }),
    Config : {
        Tokens : require("./private/tokens.json")
    }
}

Bot.Client.on("ready", () => {
    console.log(`GHOST > Logged in as: ${Bot.Client.user.tag}`);
})

Bot.Client.login(Bot.Config.Tokens.discord);