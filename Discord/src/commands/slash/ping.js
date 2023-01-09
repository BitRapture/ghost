const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("The hello-world of server applications"),
    async execute(interaction) {
        await interaction.reply("Pong :)");
    }
}