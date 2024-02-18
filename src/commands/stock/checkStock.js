const { Bot, Interaction, ApplicationCommandOptionType, EmbedBuilder, MessageEmbed} = require('discord.js')
const Stock = require("../../models/Stock")

module.exports = {

    /**
     * 
     * @param {Bot} bot 
     * @param {Interaction} interaction 
     */

    callback: async (bot,interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply({content: `:x: This command can't be used in DM!`, ephemeral: true});
            return;
        }

        const stockEmbed = new EmbedBuilder()
        .setTitle("All Stocks")
        .setColor(0xA2FFF5);
    
    const stocks1 = await Stock.find({stockType : 1});
    const stocks2 = await Stock.find({stockType : 2});
    
    if (stocks1.length > 0) {
        stockEmbed.addFields({name: "Accounts",value: " ",inline: false})
        for (const stock of stocks1) {
            stockEmbed.addFields({ name: `<:ubitoken:1205970192572747816> ${stock.name}`, value: `- Code : **${stock.code}**\n- Stock : **${stock.stockList.length} **\n- Price : **${stock.price}** <:wl:1205953655908466839>`, inline: true });
        }
    }

    if (stocks2.length > 0) {
        stockEmbed.addFields({name: "Scripts",value: " ",inline: false})
        for (const stock of stocks2) {
            stockEmbed.addFields({ name: `<:ubitoken:1205970192572747816> ${stock.name}`, value: `- Code : **${stock.code}**\n- Status : **${stock.stockStatus === true ? ":green_circle:" : ":red_circle:"} **\n- Price : **${stock.price}** <:wl:1205953655908466839>`, inline: true });
        }
    }

    
    interaction.reply({ embeds: [stockEmbed] });

    },
    name: "stock",
    description: "Check available stock."
}