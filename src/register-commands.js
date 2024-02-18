require('dotenv').config()
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js')

const commands = [
    {
        name: "embed",
        description: "Says an embed tou you!",
    },

]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering Commands To Server.");

        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log("Successfully Registering Commands To Server.");
    } catch (error) {
        console.log('Error Occured: %s', error);
    }
})();