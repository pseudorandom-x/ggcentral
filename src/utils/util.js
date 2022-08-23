const timestamp = require('time-stamp');

const BotUtils = {
	prefix: 'gg!',
	errMessage: 'Something went wrong while processing your request.',
	awSnapImg: 'https://i.imgur.com/7Fk34nn.png',

	SysLog(msg, sender = 'bot') {
		console.log(timestamp('[ HH:mm:ss ]') + ` [ ${ sender.toUpperCase() } ]`);
    console.log('> ' + msg + '\n');
	},

	ErrLog(msg, sender = 'bot') {
  	console.log(timestamp('[ HH:mm:ss ]') + '[ ERROR ]' + ` [ ${ sender.toUpperCase() } ]`);
    console.log(msg + '\n');
	},
};

module.exports = BotUtils;