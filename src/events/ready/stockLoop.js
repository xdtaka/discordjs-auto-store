const { Bot, Interaction, ApplicationCommandOptionType, EmbedBuilder, MessageEmbed, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, ComponentType} = require('discord.js')
const Stock = require("../../models/Stock");
const Guild = require("../../models/Guild");
const User = require("../../models/User")
const showAccountModal = require('../../utils/showAccountModal');
const showScriptModal = require('../../utils/showScriptModal');
const showSetGrowidModal = require('../../utils/showSetGrowidModal');
const {testServer} = require("../../../config.json")

module.exports = async(bot) => {
        // Function to update the message content
        async function updateMessage() {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString(); // Convert to a human-readable string
            const stockEmbed = new EmbedBuilder()
            .setTitle("All Stocks")
            .setDescription(`**Last update <t:${Math.floor(Date.now() / 1000)}:R>**`)
            .setColor(0x49AB43);
        
            const stocks1 = await Stock.find({stockType : 1});
            const stocks2 = await Stock.find({stockType : 2});
            const guild = await Guild.findOne({guildId: testServer});
    
            if (!guild.messageId) return;
            

            const row = new ActionRowBuilder();
            const setgrowidbtn = new ButtonBuilder().setCustomId("setgrowid").setLabel("Set GrowID").setStyle(ButtonStyle.Success)
            row.components.push(setgrowidbtn);
            row.components.push(new ButtonBuilder().setCustomId("depoinfo").setLabel("Deposit").setStyle(ButtonStyle.Success));
            
            let buyaccbtn
            let buyscbtn
            if (stocks1.length > 0) {
                stockEmbed.addFields({name: "\u200b",value: " ",inline: false})
                for (const stock of stocks1) {
                    stockEmbed.addFields({ name: `<:ubitoken:1205970192572747816> ${stock.name}`, value: `- Code : **${stock.code}**\n- Stock : **${stock.stockList.length} **\n- Price : **${stock.price}** <:wl:1205953655908466839>`, inline: true });
                }
                buyaccbtn = new ButtonBuilder().setCustomId("buyacc").setLabel("Buy Stock").setStyle(ButtonStyle.Success)
                row.components.push(buyaccbtn);
            }
        
            if (stocks2.length > 0) {
                stockEmbed.addFields({name: "\u200b",value: " ",inline: false})
                for (const stock of stocks2) {
                    stockEmbed.addFields({ name: `<:ubitoken:1205970192572747816> ${stock.name}`, value: `- Code : **${stock.code}**\n- Status : **${stock.stockStatus === true ? ":green_circle:" : ":red_circle:"} **\n- Price : **${stock.price}** <:wl:1205953655908466839>`, inline: true });
                }
                buyscbtn = new ButtonBuilder().setCustomId("buysc").setLabel("Buy Script").setStyle(ButtonStyle.Success)
                row.components.push(buyscbtn);
            }

            
    

            const msgId = guild.messageId
            const channel = await bot.channels.fetch(guild.channelId).catch((e)=>{console.log(e)});
            const message = await channel.messages.fetch(msgId).catch((e)=>{console.log(e)})
            await message.edit({embeds: [stockEmbed], components: [row]})

        }
        updateMessage()
        setInterval(updateMessage, 10000);
}