const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const User = require("../models/User")

module.exports = async(interaction) => {

    const user = await  User.findOne({userId: interaction.user.id, guildId: interaction.guild.id});

    const modal = new ModalBuilder({
        customId: `accountModal-${interaction.user.id}`,
        title: `Buy Account`,
    });
    const productCode = new TextInputBuilder({
        customId: "productcode",
        label:"Code of product (ex. guest)",
        placeholder: user?`Product Code (Your GrowID: ${user.growid})`: 'guest',
        style: TextInputStyle.Short,
        required: true,
    });

    const productAmount = new TextInputBuilder({
        customId: "amount",
        label:"Amount to buy (ex. 10)",
        placeholder: user?`Amount (Your balance: ${user.balance} wls)`: '10',
        style: TextInputStyle.Short,
        required: true,
    });
    const firstRow = new ActionRowBuilder().addComponents(productCode);
    const SecondRow = new ActionRowBuilder().addComponents(productAmount);

    modal.addComponents(firstRow,SecondRow);
    await interaction.showModal(modal);
}
