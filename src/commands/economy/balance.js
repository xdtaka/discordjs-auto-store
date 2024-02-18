const { Bot, Interaction } = require('discord.js');
const User = require("../../models/User")

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
        const targetUserId = interaction.member.id
        await interaction.deferReply()
        let user = await User.findOne( { userId : targetUserId, guildId : interaction.guild.id} )
        if (!user){
            const newUser = new User({
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            })
            await newUser.save();

            user = await User.findOne( { userId : targetUserId, guildId : interaction.guild.id} )
            interaction.editReply(`<@${user.growid}> has ${user.balance} wl(s).`)
            return;
        };

        interaction.editReply(`<@${user.growid}> has ${user.balance} wl(s).`)
        
    },  

    name: "balance",
    description: "Check user balance.",
}