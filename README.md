Download this then Run `npm install discord.js@^14.14.1 dotenv@^16.4.1 express@^4.18.2 mongodb@^6.3.0 mongoose@^8.1.1 ms@^2.1.3 pretty-ms@^9.0.0 --save`.

Open MongoDB website:
- Log in.
- Create a new project.
- Create a new deployment (choose the free option).
- Authenticate with your username and password.
- Select "My Local Environment".
- Add your IP addresses (main and RDP).
- Click "Connect".
- Select your driver.
- Copy the provided link (remember to replace <password> with your password).

Open the .env file:
- Set the MongoDB link to the MONGODB_URI.
- Set your bot token to the TOKEN (obtained from the Discord Developer Portal).

Open the config.json file:
- Replace `testServer` with your server's ID.

Running the Bot (Discord Bot and Growtopia Bot):
To run the Growtopia bot:
- Copy the contents of `depoBot.lua`.
- Paste it into your Lucifer executor.
- Add a bot (do not select the bot when running the script).
- Run the script and warp the bot into your depo world.

To run the Discord bot:
- Open a command prompt in the Discord bot folder.
- Type `node .\src\index.js`.
- Wait for "BOTNAME#0000 online!".
- Start adding your stock using /createStock and /createScript (both are optional; you can choose one or the other).
- After that, use /stockLoop, then restart the bot (press CTRL+C, then type `node .\src\index.js` again).

Your bot should now be operational. If there are any issues, please contact me on Discord (taka.net).
