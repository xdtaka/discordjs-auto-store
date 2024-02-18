const {testServer} = require("../../../config.json")
const areCommandsDifference = require("../../utils/areCommandsDifference")
const getApplicationCommands = require("../../utils/getApplicationCommands")
const getLocalCommands = require("../../utils/getLocalCommands")

module.exports = async (bot) => {
    try {
        const localCommands = getLocalCommands()
        const applicationCommands = await getApplicationCommands(bot,testServer)

        for (const localCommand of localCommands) {
            const { name, description, options} = localCommand;

            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name)

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log("Delete a command successfully")
                    continue;
                }
                if (areCommandsDifference(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand, {description,options});
                    console.log(`Edited a command ${existingCommand.name} succesfully`)
                }
            } else {
                if (localCommand.deleted) {
                    console.log("Skipping registering command since deleted is TRUE");
                    continue;
                }

                await applicationCommands.create({name,description,options});
                console.log("Created Command Succesfully")
            }
        }
    } catch (error) {
        console.log(error)
    }
}