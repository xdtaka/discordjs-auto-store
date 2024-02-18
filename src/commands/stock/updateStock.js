const { Bot, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js')
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
        const code = interaction.options.get("code").value;
        
        const stocktoadd = interaction.options.get("stock-to-add")?.attachment;
        if (stocktoadd) {
            const file = stocktoadd.url
            const response = await fetch(file);
            const stockFileContent = await response.text();
            const stockarray = stockFileContent.split(/\s+|\n/);
            const stock = await Stock.findOne({code: code})

            stockarray.forEach(eachStock => {
                if (eachStock.length > 1) {
                    stock.stockList.push(eachStock);
                }
            });
            await  stock.save()
        }
        const stockname = interaction.options.get("stock-name")?.value;
        const price = interaction.options.get("price")?.value;

        const stock = await Stock.findOne({code: code})

        stockname?stock.name = stockname: stock.name
        price?stock.price = price : stock.price
        await stock.save()
        interaction.reply({content: `Successfully updated stock. (${stock.stockList.length} Stocks available)`, ephemeral: true})
    },
    name: "updatestock",
    description: "Update name/price or add more stocks",
    options: [

        {
            name: "code",
            description: "Code of product.",
            type: ApplicationCommandOptionType.String,
            required: true
        },

        {
            name: "stock-to-add",
            description: "Stock to add, you need to attach txt file.",
            type: ApplicationCommandOptionType.Attachment,
        },

        {
            name: "stock-name",
            description: "Name of product.",
            type: ApplicationCommandOptionType.String,
        },

        {
            name: "price",
            description: "Price of product.",
            type: ApplicationCommandOptionType.Number,
        },

    ],
    permissionRequired: [PermissionFlagsBits.Administrator],
}