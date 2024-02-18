const { Bot, Interaction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Guild = require("../models/Guild")
const Stock = require("../models/Stock")
const fs = require("fs");
const User = require("../models/User");
const embedDesc = require('./embedDesc');
const giveBuyerRole = require('./giveBuyerRole');
const buyLog = require('./buyLog');

module.exports = async(interaction) => {
    await interaction.deferReply({ ephemeral: true })
    const code = interaction.fields.getTextInputValue("productcode")
    const [stock, user] = await Promise.all([
        Stock.findOne( {code: code}),
        User.findOne({userId: interaction.user.id,guildId: interaction.guild.id })
    ]);
    if (!user) {
        await interaction.editReply({embeds: [embedDesc(`Set GrowID first.`)], ephemeral: true})
        return;
    }

    if (!stock) {
        await interaction.editReply({embeds: [embedDesc(`Stock not found. Please try again.`)], ephemeral: true})
        return;
    }
    let totalPrice = stock.price
    
    if (totalPrice > user.balance) {
        await interaction.editReply({ embeds: [embedDesc(`You don't have enough balance to buy. Please deposit.`)], ephemeral: true });
        return;
    }
    
    //give role here
    await interaction.member.roles.add(stock.role);
    giveBuyerRole(interaction)
    buyLog(interaction, code, totalPrice)
    user.balance = user.balance - totalPrice

    await stock.save()
    await user.save()
    
    await interaction.editReply({embeds: [embedDesc("Purchase Completed",`Thanks for purchasing <@&${stock.role}> for **${totalPrice}** <:wl:1205953655908466839>. You have **${user.balance}** <:wl:1205953655908466839> left.`)], ephemeral: true});
}
