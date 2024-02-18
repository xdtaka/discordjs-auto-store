const Guild = require("../models/Guild")

module.exports = async(interaction) => {
    let guildDB = await Guild.findOne({guildId: interaction.guild.id} )
    if(!guildDB.buyerRole) {
        const newBuyerRole = await interaction.guild.roles.create({name: "Buyer"});
        await guildDB.updateOne({buyerRole: newBuyerRole.id})
        await guildDB.save()
        
        guildDB = await Guild.findOne({guildId: interaction.guild.id} )
        const buyerRole = interaction.guild.roles.cache.get(guildDB.buyerRole)
        await interaction.member.roles.add(newBuyerRole);
        return;
    }

    if(guildDB.buyerRole) {
        const buyerRole = await interaction.guild.roles.fetch(guildDB.buyerRole);
        if (!buyerRole) {
            const newBuyerRole = await interaction.guild.roles.create({name: "Buyer"});
            await guildDB.updateOne({buyerRole: newBuyerRole.id})
            await guildDB.save()
            await interaction.member.roles.add(newBuyerRole);
            return;
        }
        if (!interaction.member.roles.cache.has(buyerRole.id)) {
            await interaction.member.roles.add(buyerRole);
            return;
        }

    }
}