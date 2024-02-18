const { Bot, Interaction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Stock = require("../../models/Stock")
const User = require("../../models/User")
const fs = require("fs");
const accountPurchase = require('../../utils/accountPurchase');
const scriptPurchase = require('../../utils/scriptPurchase');
const setGrowID = require('../../utils/setGrowID');

function getRandomXp(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {Bot} bot 
 * @param {Interaction} interaction
 */

module.exports = async (bot, interaction) => {
    if (interaction.isModalSubmit()) {
        //Buy account stock
        if (interaction.customId === `accountModal-${interaction.user.id}`) {
            await accountPurchase(interaction)
        }
        if (interaction.customId === `scriptModal-${interaction.user.id}`) {
            await scriptPurchase(interaction)
        }
        if (interaction.customId === `growidModal-${interaction.user.id}` ) {
            await setGrowID(interaction)
        }

    }
};