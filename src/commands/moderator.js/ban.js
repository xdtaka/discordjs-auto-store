const { Bot, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Bot} bot 
     * @param {Interaction} interaction 
     */

    callback: async (bot,interaction) => {
        const targetUserId = interaction.options.get("user-to-ban").value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        //await interaction.deferReply()

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.reply({content:"That user doesn't in this server.", ephemeral:true});
            return;
        }

        if (targetUserId === interaction.guild.ownerId) {
            await interaction.reply({content:"You can't ban server owner.", ephemeral:true});
            return;
        }

        if (targetUser === interaction.guild.members.me.id) {
            await interaction.reply({content:"I can't ban myself.", ephemeral:true});
            return;
        }

        const targetUserRolePostion = targetUser.roles.highest.position; // highest role of targetUser
        const requestUserRolePostion = interaction.member.roles.highest.position; // higest role of requestUser
        const botRolePostion = interaction.guild.members.me.roles.highest.position; // higest role of bot

        if (targetUserRolePostion >= requestUserRolePostion) {
            await interaction.reply({content:"Can't ban, Target user has same/higher role than you", ephemeral:true});
            return;
        }


        try {
            await targetUser.ban( {reason : reason})
            await interaction.reply(`Banned  ${targetUser.user.tag || targetUserId} \nReason : "${reason}"`)
        } catch (error) {
            console.log(`There Was An error Trying to ban : ${error}`)
        }
    },


    name: "ban",
    description: "Ban a member",
    devOnly: false,
    // testOnly: boolean,
    options: [
        {
            name: "user-to-ban",
            description: "Mention member that u want to ban",
            required: true,
            type:  ApplicationCommandOptionType.Mentionable
        },

        {
            name: "reason",
            description: "Ban reason",
            type:  ApplicationCommandOptionType.String
        },
    ],
    permissionRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

};