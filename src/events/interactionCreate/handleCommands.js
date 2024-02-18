const {} = require('discord.js')
const {devs, testServer} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const embedDesc = require('../../utils/embedDesc');

module.exports = async (bot, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands()
    try {
        const commandObject = localCommands.find((cmd) => {return cmd.name === interaction.commandName});
        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    embeds:  [embedDesc("You don't have permission to do that")],
                    ephemeral: true,
                })
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServer)) {
                interaction.reply({
                    embeds:  [embedDesc("This server doesnt have permission to do that")],
                    ephemeral: true,
                })
                return;
            }
        }

        if (commandObject.permissionRequired?.length) {
            for (const permission of commandObject.permissionRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        embeds: [embedDesc("You don't have permission to do that")],
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        if (commandObject.botPermission?.lenght) {
            for (const permission of commandObject.botPermission) {
                const bot = interaction.guild.members.me
                if (!bot.permission.has(permission)) {
                    interaction.reply({
                        embeds:  [embedDesc("I don't have enough permission")],
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        await commandObject.callback(bot,interaction)
    } catch (error) {
        console.log(error)
    }
}