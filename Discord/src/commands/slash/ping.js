const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("The hello-world of server applications"),
    async execute(Bot, interaction) {
        await interaction.reply(`Latency from Server: \`${(Date.now() - interaction.createdAt).toString()}\`ms\nLatency from Discord API: \`${Bot.Client.ws.ping}\``);
    }
}