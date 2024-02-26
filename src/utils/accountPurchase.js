const { Bot, Interaction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Stock = require("../models/Stock")
const Guild = require("../models/Guild")
const fs = require("fs");
const User = require("../models/User");
const embedDesc = require('./embedDesc');
const giveBuyerRole = require('./giveBuyerRole');
const buyLog = require('./buyLog');

module.exports = async(interaction) => {

    const code = interaction.fields.getTextInputValue("productcode")
    const amount = interaction.fields.getTextInputValue("amount")
    const stock = await Stock.findOne( {code: code})
    const user = await User.findOne({userId: interaction.user.id,guildId: interaction.guild.id })


    if (!stock) {
        interaction.reply({embeds: [embedDesc(`Stock not found. Please try again.`)], ephemeral: true})
        return;
    }
    let totalPrice = stock.price * amount
    
    if (totalPrice > user.balance) {
        interaction.reply({ embeds: [embedDesc(`You don't have enough balance to buy. Please deposit.`)], ephemeral: true });
        return;
    }

    if (amount > stock.stockList.length && stock.stockList.length > 0 && amount > 0) {
        interaction.reply({ embeds: [embedDesc(`You can't buy more than that.`)], ephemeral: true });
        return;
    }else if (amount <= 0) {
        interaction.reply({ embeds: [embedDesc(`The minimum purchase is 1.`)], ephemeral: true });
        return;
    }else if (stock.stockList.length === 0) {
        interaction.reply({ embeds: [embedDesc(`Out of stock.`)], ephemeral: true });
        return;
    }

    
    let stockToSend = []
    for (let i = amount - 1; i >= 0; i--) {
        if (stock.stockList[i]) {
            if (stock.stockList[i].length > 1) {
                stockToSend.push(stock.stockList[i]);
                stock.stockList.pull(stock.stockList[i]);
            }
        }
    }
    totalPrice = stock.price*stockToSend.length
    user.balance = user.balance - totalPrice
    const stockToSendString = stockToSend.join('\n')
    fs.writeFileSync(`stock.txt`, stockToSendString);

    const stockAttachment = new AttachmentBuilder("stock.txt", 'result.txt')
    await stock.save()
    await user.save()
    
    buyLog(interaction,code,totalPrice,amount)
    giveBuyerRole(interaction)
    interaction.user.send({embeds: [embedDesc("Purchase Completed",`Thanks for purchasing the product : **${stockToSend.length}x ${code}** for **${totalPrice}** <:wl:1205953655908466839>. You have **${user.balance}** <:wl:1205953655908466839> left.`)], files: [stockAttachment]});
    interaction.deferUpdate()
}
