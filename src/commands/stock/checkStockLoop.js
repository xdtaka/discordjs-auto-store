const {PermissionFlagsBits, Bot, Interaction, ApplicationCommandOptionType, EmbedBuilder, MessageEmbed, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, ComponentType} = require('discord.js')
const Stock = require("../../models/Stock");
const User = require("../../models/User")
const Guild = require("../../models/Guild")
const showAccountModal = require('../../utils/showAccountModal');
const showScriptModal = require('../../utils/showScriptModal');
const showSetGrowidModal = require('../../utils/showSetGrowidModal');

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

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // Convert to a human-readable string
        const stockEmbed = new EmbedBuilder()
        .setTitle("All Stocks")
        .setDescription(`**Last update <t:${Math.floor(Date.now() / 1000)}:R>**`)
        .setColor(0x49AB43);

        const row = new ActionRowBuilder();
        row.components.push(new ButtonBuilder().setCustomId("setgrowid").setLabel("Set GrowID").setStyle(ButtonStyle.Success));
        row.components.push(new ButtonBuilder().setCustomId("depoinfo").setLabel("Deposit").setStyle(ButtonStyle.Success));

    
    const stocks1 = await Stock.find({stockType : 1});
    const stocks2 = await Stock.find({stockType : 2});
    
    if (stocks1.length > 0) {
        stockEmbed.addFields({name: "\u200b",value: " ",inline: false})
        for (const stock of stocks1) {
            stockEmbed.addFields({ name: `<:ubitoken:1205970192572747816> ${stock.name}`, value: `- Code : **${stock.code}**\n- Stock : **${stock.stockList.length} **\n- Price : **${stock.price}** <:wl:1205953655908466839>`, inline: true });
        }
        row.components.push(new ButtonBuilder().setCustomId("buyacc").setLabel("Buy Stock").setStyle(ButtonStyle.Success));
    }

    if (stocks2.length > 0) {
        stockEmbed.addFields({name: "\u200b",value: " ",inline: false})
        for (const stock of stocks2) {
            stockEmbed.addFields({ name: `<:ubitoken:1205970192572747816> ${stock.name}`, value: `- Code : **${stock.code}**\n- Status : **${stock.stockStatus === true ? ":green_circle:" : ":red_circle:"} **\n- Price : **${stock.price}** <:wl:1205953655908466839>`, inline: true });
        }
        row.components.push(new ButtonBuilder().setCustomId("buysc").setLabel("Buy Script").setStyle(ButtonStyle.Success));
    }

    let guild = await Guild.findOne( {guildId : interaction.guild.id} );

    var reply
    if (!guild) {
        // Reply with the initial message
        reply = await interaction.reply({ embeds: [stockEmbed], fetchReply: true, components: [row]});
        const newGuild = new Guild({
            guildId: interaction.guild.id,
            messageId: reply.id,
            channelId: interaction.channel.id,
        })
        
        await newGuild.save()
    }else if(guild) {
        reply = await interaction.reply({ embeds: [stockEmbed], fetchReply: true, components: [row]});
        guild.messageId = reply.id
        guild.channelId =  interaction.channel.id;
        await guild.save()
    }
    },
    name: "stockrealtime",
    description: "Check available stock real-time.",
    permissionRequired: [PermissionFlagsBits.Administrator],
}