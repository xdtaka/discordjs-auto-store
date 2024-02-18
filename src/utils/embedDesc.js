const {EmbedBuilder} = require('discord.js')
module.exports = (title, desc) => {
    const embed = new EmbedBuilder()
    title?embed.setTitle(title):'';
    desc?embed.setDescription(desc):'';
    embed.setColor(0x43A4F6)
    return embed


};