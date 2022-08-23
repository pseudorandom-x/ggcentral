require('dotenv').config();

const { PermissionsBitField, EmbedBuilder } = require('discord.js');

const twitterHandler = require('../../streams/twitter');

const redditHandler = require('../../streams/reddit');

const BotUtils = require('../../utils/util');

const alert = async function (cmdArr, message) {
  if (!message.author.has(PermissionsBitField.Flags.ModerateMembers)) {
    message.reply(
      `Sorry ${ message.author.username }, you do not have minimum required permissions to setup alerts.`
    );
    BotUtils.SysLog('Command rejected: not enough permissions.');

    return;
  }

  if (cmdArr[1] === undefined
    || cmdArr[1].toLowerCase() !== 'here'
    || cmdArr[1].toLowerCase() !== 'h')
  {
    message.reply(
      `Hey, it looks like you're missing a mandatory argument for this command.\n` +
      `Usage:\n` +
      `gg!alert -h OR gg!alert -here.\n` +
      `Since alerts can drop at any time, I need your explicit permission to setup alerts for this channel!`
    );
    BotUtils.SysLog('Command rejected: invalid argument(s)');

    return;
  }

  const channelID = message.channelID;

  await twitterHandler.add(channelID);
  await redditHandler.add(channelID);

  message.channel.send(
    `Channel (id: ${ channelID }) has been setup for ALERTS! 🚨)`
  );
};