require('dotenv').config();

const dbHandler = require('../../database/handler');

const { PermissionsBitField } = require('discord.js');

const BotUtils = require('../../utils/util');

const alert = async function (cmdArr, message) {
  if (!message.author.has(PermissionsBitField.Flags.ModerateMembers)) {
    message.reply(
      `Sorry ${ message.author.username }, you do not have minimum required permissions to setup alerts.`
    );
    BotUtils.SysLog('Command rejected: not enough permissions.');

    return;
  }

  if (cmdArr.length !== 2
    || cmdArr[1].toLowerCase() !== 'h'
    || cmdArr[1].toLowerCase() !== 'here')
  {
    message.reply(
      `Hey, it looks like you're missing a mandatory argument for this command.\n` +
      `Usage:\n` +
      `gg!alert -h OR gg!alert -here.` +
      `Since alerts can drop at any time, I need your explicit permission to setup alerts for this channel!`
    );
    BotUtils.SysLog('Command rejected: invalid argument(s)');

    return;
  }

  const serverID = message.guilds.id;
  const channelID = message.channelID;

  const result = dbHandler.add(serverID, channelID);

  if (result) {
    message.channel.send(
      `Channel (id: ${ channelID }) has been setup for ALERTS! 🚨`
    );
  }
  else {
    message.reply(
      `Channel (id: ${ channelID }) already exists in my database and is setup for alerts.\n` +
      `However, if you have the permissions, you can setup alerts in other channels.`
    );
  }
};

module.exports = alert;