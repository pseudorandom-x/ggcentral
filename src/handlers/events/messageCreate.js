const BotUtils = require('../../utils/util');

const messageCreateHandler = async function (message) {
  if (!message.content.startsWith(BotUtils.prefix) || message.author.bot)
    return;

  // BotUtils.SysLog(message.channel.id);
  const cmdArr = message.content.slice(BotUtils.prefix.length).split(' ');
  await require(`../commands/${ cmdArr[0] }`)(cmdArr, message);
};

module.exports = messageCreateHandler;