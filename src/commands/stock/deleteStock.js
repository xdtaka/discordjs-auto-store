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
        try {
            const stock = await Stock.findOneAndDelete({ code: code });
        
            if (!stock) {
                interaction.reply({ content: `This stock doesn't exist or hasn't been added to the database yet.`, ephemeral: true });
                return;
            }
        
            interaction.reply({ content: `Stock with code ${code} has been removed successfully.`, ephemeral: true });
        } catch (error) {
            console.error('Error removing stock:', error);
        }
    },
    name: "deletestock",
    description: "Delete existing stock.",
    options: [

        {
            name: "code",
            description: "Code of product.",
            type: ApplicationCommandOptionType.String,
            required: true
        },

    ],
    permissionRequired: [PermissionFlagsBits.Administrator],
}