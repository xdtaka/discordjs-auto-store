const {Client, IntentsBitField, EmbedBuilder, Embed, ActivityType, Events} = require('discord.js');
const eventHandler = require('./handlers/eventHandler.js');
const mongoose = require('mongoose')
const express = require('express');
const addBalance = require('./utils/addBalance.js');
require('dotenv').config()

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/addbalance/:user/:amount', (req, res) => {
  const { user, amount } = req.params;
  addBalance(bot, user, amount)
  res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


(async ()=>{
    try {
        await mongoose.set('strict', false) //Turn off strict mode for MongoDB (optional)
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to db")
        bot.login(process.env.TOKEN);
        eventHandler(bot)
    } catch (error) {
        console.log(error)
    }
})();
