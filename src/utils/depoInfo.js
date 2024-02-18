
const {Bot, Interaction} = require('discord.js')
const User = require('../models/User')
const embedDesc = require('./embedDesc')

module.exports = async(interaction) => {
    /**
     * 
     * @param {Bot} bot 
     * @param {Interaction} interaction 
     */
    const response = await fetch('http://localhost:80/bot/get').catch((e) => {const hehe = e});
    if (!response) {
      interaction.reply({embeds: [embedDesc("Bot is offline (Can't fetch bot infos)","Contact owner for any assistance.")], ephemeral:true})
      return;
    }
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const user = await  User.findOne({userId: interaction.user.id, guildId: interaction.guild.id});
    const data = await response.json();
    interaction.reply({embeds: [embedDesc("Deposit Info", `<:info:1208385122454208533> Your GrowID: **${user.growid ? user.growid : "No GrowID"}\n**<:world:1208269873843666994> World: **${data.world}**\n<:nerdbot:1208269840033517598> Bot Name: **${data.botName} ${(data.botStatus === "Online")? "<:online:1208261433201139732>" : "<:offline:1208262040045490347>"}**`).setFooter({text: "Don't deposit if bot is offline."})], ephemeral: true})

}

