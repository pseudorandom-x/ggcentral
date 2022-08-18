const timestamp = require('time-stamp');

const BotUtils = {
	prefix: 'gg!',
	errMessage: 'Something went wrong while processing your request.',
	awSnapImg: 'https://i.imgur.com/7Fk34nn.png',

	SysLog(msg) {
		console.log(timestamp('[HH:mm:ss] > ') + msg);
	},
	ErrLog(msg) {
		console.log('[ERROR] > ' + msg);
	},
	UsdToRupees(usd) {
		return usd * 79.81;
	}
};

module.exports = BotUtils;