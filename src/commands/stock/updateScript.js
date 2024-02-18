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
        const status = interaction.options.get("script-status").value;
        const name = interaction.options.get("script-name")?.value;
        const role = interaction.options.get("role-to-give")?.value;
        const price = interaction.options.get("price")?.value;

    
        const stock = await Stock.findOne({code: code})
        if (!stock) {
            interaction.reply({ content:"This stock doesn't exist in our database. Try again or Use /addScript to create a new one.", ephemeral:true });
            return;
        }
        
        if (name) {
            stock.name = name
        };
        role? stock.role = role: stock.role;
        price? stock.price = price: stock.price;
        stock.stockStatus = status
        await stock.save()
        interaction.reply({content: `Successfully updated script status. (to ${stock.stockStatus === true ? "Available" : "Unavailable"})`, ephemeral: true})
    },
    name: "updatescript",
    description: "Update status of script.",
    options: [

        {
            name: "code",
            description: "Code of product.",
            type: ApplicationCommandOptionType.String,
            required: true
        },


        {
            name: "script-status",
            description: "Status of script",
            type: ApplicationCommandOptionType.Boolean,
            choices: [{name: 'Available', value: true}, {name: 'Unavailable', value: false}],
            required: true
        },

        {
            name: "role-to-give",
            description: "Role to give after client purchase this product (ex @Dirt farm).",
            type: ApplicationCommandOptionType.Role,
        },

        {
            name: "script-name",
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