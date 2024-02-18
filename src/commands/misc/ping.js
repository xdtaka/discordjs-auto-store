const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType } = require('discord.js');
const showAccountModal = require('../../utils/showAccountModal');
const Guild = require("../../models/Guild");
const buyLog = require('../../utils/buyLog');
const embedDesc = require('../../utils/embedDesc');

module.exports = {
    name: "ping",
    description: "Pong!",
    // devOnly: boolean,
    // testOnly: boolean,
    // options: Objects[],
    // deleted: boolean,

    callback: async(bot,interaction) => {
    /**
     * 
     * @param {Bot} bot 
     * @param {Interaction} interaction 
     */
    const response = await fetch('http://localhost:80/bot/get');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    interaction.reply({embeds: [embedDesc("Deposit Info", `<:world:1208269873843666994> World: **${data.world}**\n<:nerdbot:1208269840033517598> Bot Name: **${data.botName} ${(data.botStatus === "Online")? "<:online:1208261433201139732>" : "<:offline:1208262040045490347>"}**`).setFooter({text: "Don't deposit if bot is offline."})], ephemeral: true})
}};