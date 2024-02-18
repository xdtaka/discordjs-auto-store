const { Bot, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const ms = require('ms')

module.exports = {
    /**
     * 
     * @param {Bot} bot 
     * @param {Interaction} interaction 
     */

    callback: async (bot,interaction) => {
        const targetUserId = interaction.options.get("target-user").value;
        const duration = interaction.options.get("duration").value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";
        
        targetUser = await interaction.guild.members.fetch(targetUserId)

        if (!targetUser) {
            interaction.reply({content:"Target is not in the server.", ephemeral:true});
            return;
        }

        if (targetUser.user.bot) {
            interaction.reply({content:"Can't timeout bot.", ephemeral:true});
            return;
        }

        const msDuration = ms(duration)
        if (isNaN(msDuration)) {
            interaction.reply({content:`Invalid time given. Please use something like 1h, 1 day`, ephemeral:true});
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e+9) {
            interaction.reply({content:`Can't timeout member less than 5 seconds or more than 28 days.`, ephemeral:true});
            return;
        }

        const targetUserRolePostion = targetUser.roles.highest.position; // highest role of targetUser
        const requestUserRolePostion = interaction.member.roles.highest.position; // higest role of requestUser
        const botRolePostion = interaction.guild.members.me.roles.highest.position; // higest role of bot

        if (targetUserRolePostion >= requestUserRolePostion) {
            await interaction.reply({content:"Can't timeout, Target user has same/higher role than you.", ephemeral:true});
            return;
        }

        if (targetUserRolePostion >= botRolePostion) {
            await interaction.reply({content:"Can't timeout, Target user has same/higher role than bot.", ephemeral:true});
            return;
        }
        
        try {
            const { default: prettyMs } = await import('pretty-ms');
            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.reply(`Updated timeout on ${targetUser} to ${prettyMs(msDuration, {verbose: true})}. \nReason : "${reason}"`);
                return;
            }
            await targetUser.timeout(msDuration, reason);
            await interaction.reply(`Timeout ${targetUser} for ${prettyMs(msDuration, {verbose: true})}. \nReason : "${reason}"`);
            
        } catch (error) {
            console.log(`There Was An error Trying to time out : ${error}`)
        }
    },


    name: "timeout",
    description: "Timeout a member",
    devOnly: false,
    // testOnly: boolean,
    options: [
        {
            name: "target-user",
            description: "Mention member that u want to ban",
            required: true,
            type:  ApplicationCommandOptionType.Mentionable
        },

        {
            name: "duration",
            description: "Timeout duration (30m, 2h, 1 day)",
            type:  ApplicationCommandOptionType.String,
            required: true,
        },

        {
            name: "reason",
            description: "Ban reason",
            type:  ApplicationCommandOptionType.String
        },
    ],
    permissionRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],

};