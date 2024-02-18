const { Bot, Message } = require('discord.js');
const Level = require("../../models/Level");
const calculateXp = require("../../utils/calculateXp");
const cooldowns = new Set();



function getRandomXp(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {Bot} bot 
 * @param {Message} message
 */

module.exports = async (bot, message) => {
    if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return; // Ignore bots and messages not in a guild

    const xpToGive = getRandomXp(5,15)
    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };

    try {
        const level = await Level.findOne(query)
        if (level) {
            level.xp += xpToGive
            
            if  (level.xp >= calculateXp(level.level)) {
                level.xp = 0;
                level.level += 1;

                message.channel.send(`${message.member} Have reached **level ${level.level}**! Keep up the good work!`)
            }

            level.save().catch((e) => {
                console.log(`Error on saving XP data :${e}`)
                return;
            })
            cooldowns.add(message.author.id)
            setTimeout(() => {
                cooldowns.delete(message.author.id)
            },60000);
        
        }
        else{
            const newLevel = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xpToGive,
            })

            await newLevel.save();
            cooldowns.add(message.author.id)
            setTimeout(() => {
                cooldowns.delete(message.author.id)
            },15000);
        }

    } catch (error) {
        console.log(error)
    }
};