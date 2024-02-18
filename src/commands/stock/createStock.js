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
        
        const stocktoadd = interaction.options.get("stock-to-add").attachment;
        const file = stocktoadd.url
        const response = await fetch(file);
        const stockFileContent = await response.text();
        const stockarray = stockFileContent.split(/\s+|\n/);
        const stockname = interaction.options.get("stock-name")?.value;
        const price = interaction.options.get("price")?.value;

    
        const stock = await Stock.findOne({code: code})
        if (!stock && stockname && price) {
            const newStock = new Stock({
                name: stockname,
                code: code,
                price: price,
                stockType: 1,
            });
            await stockarray.forEach(eachStock => {
                if (eachStock !== "") {
                    newStock.stockList.push(eachStock);
                }
            });
            await newStock.save()
            interaction.reply({content: `Created new stock! (${stockname})`, ephemeral: true})
            return;
        }else if(!stock && !stockname && !price) {
            interaction.reply({content: `Need to fill **stock-name** and **price** in order to add new stock.`, ephemeral: true});
            return;
        }
    },
    name: "createstock",
    description: "Create new stocks.",
    options: [

        {
            name: "code",
            description: "Code of product.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },


        {
            name: "stock-to-add",
            description: "Stock to add. If multiple items, you need to paste from txt file OR separate by space.",
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        },

        {
            name: "stock-name",
            description: "Name of product.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },

        {
            name: "price",
            description: "Price of product.",
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    permissionRequired: [PermissionFlagsBits.Administrator],
}