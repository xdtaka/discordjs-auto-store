const { Bot, Interaction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Stock = require("../../models/Stock")
const User = require("../../models/User")
const fs = require("fs");
const accountPurchase = require('../../utils/accountPurchase');
const scriptPurchase = require('../../utils/scriptPurchase');
const setGrowID = require('../../utils/setGrowID');
const showSetGrowidModal = require('../../utils/showSetGrowidModal');
const showAccountModal = require('../../utils/showAccountModal');
const showScriptModal = require('../../utils/showScriptModal');
const depoInfo = require('../../utils/depoInfo');


/**
 * 
 * @param {Bot} bot 
 * @param {Interaction} interaction
 */

module.exports = async (bot, interaction) => {
    if (interaction.isButton()) {
        const user = await User.findOne({ userId: interaction.user.id, guildId: interaction.guild.id})
        if (!user) {
            await showSetGrowidModal(interaction);
            return;
        }
        if (interaction.customId === 'setgrowid') {
            await showSetGrowidModal(interaction);
        } else if (interaction.customId === 'buyacc') {
            await showAccountModal(interaction);
        } else if (interaction.customId === 'buysc') {
            await showScriptModal(interaction)
        } else if (interaction.customId === 'depoinfo') {
            await depoInfo(interaction)
        }

    }
};