const {ChannelType, Bot, Interaction} = require("discord.js")
const Guild = require("../models/Guild")
const Stock = require("../models/Stock")
const embedDesc = require("./embedDesc")

module.exports = async(interaction, code, totalPrice, amount) => {

        /**
     * 
     * @param {Bot} bot 
     * @param {Interaction} interaction 
     */
    
    let guildDB = await Guild.findOne({guildId: interaction.guild.id} )
    const stock = await Stock.findOne({code: code})
    guildDB.orderCount = guildDB.orderCount + 1
    guildDB.totalIncome = guildDB.totalIncome + totalPrice
    await guildDB.save()
    let logCategory, logChannel
    if(!interaction.guild.channels.cache.get(guildDB.logChannelId)) {
        const category = await interaction.guild.channels.cache.find(channel => channel.type === ChannelType.GuildCategory && channel.name === "Purchase-Log");
        if (!category) {
            logCategory = await interaction.guild.channels.create({
                name: "Purchase-Log",
                type: ChannelType.GuildCategory,
            })
        }
        logChannel = await interaction.guild.channels.create({
            name: "Purchase-History",
            type: ChannelType.GuildText,
            parent: (category ? category.id : logCategory.id),
        })

        await guildDB.updateOne({logChannelId: logChannel.id})
        await guildDB.save()
        guildDB = await Guild.findOne({guildId: interaction.guild.id} )
        if (amount) {
            await logChannel.send({embeds: [embedDesc(`Order #${guildDB.orderCount += 1}`, `Buyer: <@${interaction.member.id}>\nProduct: **${amount} ${stock.name}**\nTotal Price: **${totalPrice}**  <:wl:1205953655908466839>`).setFooter({text:`Total Income: ${guildDB.totalIncome} wls`})]})
        }else {await logChannel.send({embeds: [embedDesc(`Order #${guildDB.orderCount += 1}`, `Buyer: <@${interaction.member.id}>\nProduct: **${stock.name}**\nTotal Price: **${totalPrice}**  <:wl:1205953655908466839>`).setFooter({text:`Total Income: ${guildDB.totalIncome} wls`})]})}
        return;
    }

    if(interaction.guild.channels.cache.get(guildDB.logChannelId)) {
        guildDB = await Guild.findOne({guildId: interaction.guild.id} )
        const channel = await interaction.guild.channels.cache.get(guildDB.logChannelId)
        if (amount) {
            await channel.send({embeds: [embedDesc(`Order #${guildDB.orderCount}`, `Buyer: <@${interaction.member.id}>\nProduct: **${amount} ${stock.name}**\nTotal Price: **${totalPrice}**  <:wl:1205953655908466839>`).setFooter({text:`Total Income: ${guildDB.totalIncome} wls`})]})
        }else {await channel.send({embeds: [embedDesc(`Order #${guildDB.orderCount}`, `Buyer: <@${interaction.member.id}>\nProduct: **${stock.name}**\nTotal Price: **${totalPrice}**  <:wl:1205953655908466839>`).setFooter({text:`Total Income: ${guildDB.totalIncome} wls`})]})}

    }
}
