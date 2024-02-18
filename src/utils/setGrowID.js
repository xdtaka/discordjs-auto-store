const { Bot, Interaction, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Stock = require("../models/Stock")
const fs = require("fs");
const User = require("../models/User");
const embedDesc = require('./embedDesc');

module.exports = async(interaction) => {
    try {
        if (!interaction.inGuild()) return;
        const growid = interaction.fields.getTextInputValue("growid");
        const isGrowidExist = await User.find({growid: growid});
        if (isGrowidExist.length) {
            interaction.reply({embeds: [embedDesc(`**"${growid}"** is already taken.` ,`Contact the owner for assistance.`)], ephemeral:true})
            return;
        }
        
        let user = await User.findOne({ userId: interaction.member.id, guildId: interaction.guild.id} );
        if (!user) {
            const newUser = new User({
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            })
            await newUser.save();
            user = await User.findOne({ userId: interaction.member.id, guildId: interaction.guild.id} );
            if (!user.growid) {
                user.growid=growid.toLowerCase();
                await user.save();
                interaction.reply({embeds: [embedDesc(`Succesfully set GrowID to **${growid}**!`)], ephemeral: true});
                return;
            }
        }else {
            if (!user.growid) {
                user.growid = growid.toLowerCase();
                await user.save();
                interaction.reply({embeds: [embedDesc(`Succesfully set GrowID to **${growid}**!`)], ephemeral: true});
                return;
            }
            if (user.growid !== growid) {
                user.growid = growid.toLowerCase();
                await user.save();
                interaction.reply({embeds: [embedDesc(`Updated GrowID to **${growid}**!`)], ephemeral: true});
                return;
            }else{
                interaction.reply({embeds: [embedDesc(`:x: Your GrowID is already set to **${growid}**.`)], ephemeral: true});
                return;
            }
        }

    } catch (error) {
        console.log(`Error with setGrowID ${error}`)
    }
    }
