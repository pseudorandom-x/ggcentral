const BotUtils = require('../../utils/util');

const messageCreateHandler = function(message) {
  if (!message.content.startsWith(BotUtils.prefix) || message.author.bot)
    return;
  // BotUtils.SysLog(message.channel.id);
  const cmdArr = message.content.slice(BotUtils.prefix.length).split(' ');
  require(`../commands/${ cmdArr[0] }`)(cmdArr, message);
};

module.exports = messageCreateHandler;