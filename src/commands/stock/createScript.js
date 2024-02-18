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
        const status = interaction.options.get("stock-status").value;
        const stockname = interaction.options.get("stock-name")?.value;
        const price = interaction.options.get("price")?.value;
        const role = interaction.options.get("role-to-give").value

    
        const stock = await Stock.findOne({code: code})
        if (!stock && stockname && price) {
            const newStock = new Stock({
                name: stockname,
                code: code,
                price: price,
                stockType: 2,
                stockStatus: status,
                role: role
            });
            await newStock.save()
            interaction.reply({content: `Created new script! (${stockname})`, ephemeral: true})
            return;
        }else if(!stock && !stockname && !price) {
            interaction.reply({content: `Need to fill **stock-name** and **price** in order to add new script.`, ephemeral: true});
            return;
        }
    },
    name: "createscript",
    description: "Create new script stock.",
    options: [

        {
            name: "code",
            description: "Code of product.",
            type: ApplicationCommandOptionType.String,
            required: true
        },

        {
            name: "role-to-give",
            description: "Role to give after client purchase this product (ex @Dirt farm).",
            type: ApplicationCommandOptionType.Role,
            required: true
        },


        {
            name: "stock-status",
            description: "Status of script",
            type: ApplicationCommandOptionType.Boolean,
            choices: [{name: 'Available', value: true}, {name: 'Unavailable', value: false}],
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