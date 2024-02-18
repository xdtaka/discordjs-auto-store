const {Client, IntentsBitField, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
require('dotenv').config()

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

const roles = [
    {
        id: "1198427386639831090",
        label: "Purple",
    },
    {
        id: "1198427489404469298",
        label: "Blue",
    },
    {
        id: "1198427564973228152",
        label: "Red",
    },
]

bot.on("ready", async (b) => {
    try {
        const channel = await bot.channels.cache.get("1198432581977374850");
        if (!channel) return;

        const row = new ActionRowBuilder()
        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Success)
            );
        });

        await channel.send(
        {
            content: "Claim Your Role",
            components: [row]
        });
        process.exit()
    } catch (error) {
        console.log(error)
    }
});


bot.login(process.env.TOKEN);