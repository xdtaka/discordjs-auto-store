const { Bot, Interaction, ApplicationCommandOptionType } = require('discord.js');
const User = require("../../models/User");

module.exports = {

        /**
     * 
     * @param {Bot} bot 
     * @param {Interaction} interaction 
     */

    callback: async (bot,interaction) => {
        try {
            await interaction.deferReply();
            if (!interaction.inGuild()) return;
            const growid = interaction.options.get("growid").value;
            let user = await User.findOne({ userId: interaction.member.id, guildId: interaction.guild.id} );
            if (!user) {
                const newUser = new User({
                    userId: interaction.member.id,
                    guildId: interaction.guild.id,
                })
                await newUser.save();
                user = await User.findOne({ userId: interaction.member.id, guildId: interaction.guild.id} );
                if (!user.growid) {
                    user.growid=growid;
                    await user.save();
                    await interaction.editReply(`Succesfully set GrowID to ${growid}!`);
                    return;
                }
            }else {
                if (!user.growid) {
                    user.growid = growid;
                    await user.save();
                    await interaction.editReply(`Succesfully set GrowID to ${growid}!`);
                    return;
                }
                if (user.growid !== growid) {
                    user.growid = growid;
                    await user.save();
                    await interaction.editReply(`Updated GrowID to ${growid}!`);
                    return;
                }else{
                    await interaction.editReply(`:x: Your GrowID is already set to ${growid}`);
                    return;
                }
            }

        } catch (error) {
            console.log(`Error with setGrowID ${error}`)
        }
        
    },
    name: "set",
    description: "Set growid.",
    options: [
        {
            name: "growid",
            description: "Your growid.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ]
}