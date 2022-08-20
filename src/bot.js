'use strict';

require('dotenv').config();

const fs = require('fs');

const { Client, IntentsBitField, GatewayIntentBits } = require('discord.js');

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    IntentsBitField.Flags.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [
    'CHANNEL' // doesn't work still
  ]
});

const BotUtils = require('./utils/util');

for (const eventFile of fs.readdirSync('./handlers/events/')) {
  if (eventFile.endsWith('.js')) {
    const event = eventFile.split('.')[0];

    // register event and the respective callback
    bot.on(event, require(`./handlers/events/${ event }`));
  }
}

bot.once('ready', () => {
  BotUtils.SysLog('Bot up and running!\n');
});

bot.login(process.env.BOT_TOKEN)
  .then(() => {
    BotUtils.SysLog('** Token verified. Logging in... **')
  })
  .catch((err) => {
    BotUtils.ErrLog(err.message);
  });