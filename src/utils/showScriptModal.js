const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const User = require("../models/User")

module.exports = async(interaction) => {

    const user = await  User.findOne({userId: interaction.user.id, guildId: interaction.guild.id});

    const modal = new ModalBuilder({
        customId: `scriptModal-${interaction.user.id}`,
        title: `Buy Script`,
    });


    const productCode = new TextInputBuilder({
        customId: "productcode",
        label:"Code of product",
        placeholder: user?`Product code (Your balance: ${user.balance} wls)`: 'df',
        style: TextInputStyle.Short,
        required: true,
    });
    const firstRow = new ActionRowBuilder().addComponents(productCode);

    modal.addComponents(firstRow);
    await interaction.showModal(modal);
}
