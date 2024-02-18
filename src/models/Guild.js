const { Schema, model } = require("mongoose");
const Stock = require("./Stock"); // Import the Stock schema

// Define the Guild schema with Stock embedded as a subdocument
const guildSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    messageId: {
        type: String
    },
    channelId: {
        type: String,
    },
    buyerRole: {
        type: String,
    },
    logChannelId: {
        type: String,
    },
    orderCount: {
        type: Number,
        default: 0,
    },
    totalIncome: {
        type: Number,
        default: 0,
    },

});

// Export the Guild model
module.exports = model("Guild", guildSchema);
