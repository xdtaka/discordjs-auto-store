const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const User = require("../models/User")

module.exports = async(interaction) => {

    const user = await  User.findOne({userId: interaction.user.id, guildId: interaction.guild.id});

    const modal = new ModalBuilder({
        customId: `growidModal-${interaction.user.id}`,
        title: `Set GrowID`,
    });


    const growid = new TextInputBuilder({
        customId: "growid",
        label:"GrowID",
        placeholder: `Please provide your GrowID.`,
        style: TextInputStyle.Short,
        required: true,
    });
    const firstRow = new ActionRowBuilder().addComponents(growid);

    modal.addComponents(firstRow);
    await interaction.showModal(modal);
}
