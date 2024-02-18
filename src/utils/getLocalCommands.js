const path = require('path')
const getAllFiles = require('./getAllFiles');
const consolelog = require('../events/ready/consolelog');

module.exports = (exceptions = []) => {
    const localCommands = [];
    const commandCategories = getAllFiles(path.join(__dirname,'..','commands'), true);

    for (commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        for (commandFile of commandFiles) {
            const commandObject = require(commandFile)
            if (exceptions.includes(commandObject.name)) {
                continue;
            }
            localCommands.push(commandObject)
        }
    }


    return localCommands;
}