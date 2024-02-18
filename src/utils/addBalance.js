const User = require("../models/User");
const embedDesc = require("./embedDesc");
module.exports = async(bot, user, amount) => {
    const growid = await User.findOne({growid: user});
    if (growid) {
        growid.balance += parseInt(amount);
        await growid.save()
    
        const dmChannel = bot.users.cache.get(growid.userId)
        console.log("Depo success")
        await dmChannel.send({embeds: [embedDesc("Deposit Completed",`Added ${amount}  <:wl:1205953655908466839> into your account.\nYour new balance is ${growid.balance}  <:wl:1205953655908466839> `)]})
    }
}