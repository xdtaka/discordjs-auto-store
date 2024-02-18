
Setup:

Run npm install discord.js@^14.14.1 dotenv@^16.4.1 express@^4.18.2 mongodb@^6.3.0 mongoose@^8.1.1 ms@^2.1.3 pretty-ms@^9.0.0 --save.\n
Open MongoDB website:\n
    Log in.\n
    Create a new project.\n
    Create a new deployment (choose the free option).\n
    Authenticate with your username and password.\n
    Select "My Local Environment".\n
    Add your IP addresses (main and RDP).\n
    Click "Connect".\n
    Select your driver.\n
    Copy the provided link (remember to replace <password> with your password).\n
Open the .env file:\n
    Set the MongoDB link to the MONGODB_URI.\n
    Set your bot token to the TOKEN (obtained from the Discord Developer Portal).\n
Open the config.json file:\n
    Replace testServer with your server's ID.\n
    Running the Bot (Discord Bot and Growtopia Bot):\n

To run the Growtopia bot:\n
    Copy the contents of depoBot.lua.\n
    Paste it into your Lucifer executor.\n
    Add a bot (do not select the bot when running the script).\n
    Run the script and warp the bot into your depo world.\n
To run the Discord bot:\n
    Open a command prompt in the Discord bot folder.\n
    Type node .\src\index.js.\n
    Wait for "BOTNAME#0000 online!".\n
    Start adding your stock using /createStock and /createScript (both are optional; you can choose one or the other).\n
    After that, use /stockLoop, then restart the bot (press CTRL+C, then type node .\src\index.js again).\n
    Your bot should now be operational. If there are any issues, please contact me on Discord (taka.net).\n
