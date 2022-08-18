const fetch = require('node-fetch');

const { EmbedBuilder } = require('discord.js');

const BotUtils = require('../../utils/util');

const deals = function(cmdArr, message) {
	let x = 'Steam';
	let shops = 'steam';

	if (cmdArr[1] !== undefined) {
		if (cmdArr[1] === '-a') {
			x = 'the web';
			shops = ['steam', 'gog', 'greenmangaming', 'humblestore', 'amazonus', 'microsoft', 'gamesplanet', 'epic', 'origin'].join('%2C');
		}
		else {
			shops = cmdArr[1].split(',').join('%2C');
		}
	}

	fetch(`https://api.isthereanydeal.com/v01/deals/list/?key=${ process.env.ITAD_KEY }&limit=8&shops=${ shops }&sort=cut%3Adesc`)
		.then(res => res.json())
		.then(res => {
			const titles = [];
			const cuts = [];
			const items = res.data.list;

			for (const item of items) {
				titles.push(`[${ item.title }](${ item.urls.buy })`);
				cuts.push(item.price_cut);
			}

			BotUtils.SysLog('Grabbed deals. Formatting embed...');

			message.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(0xFF10F0)
						.setTitle('__Top 5 deals currently__')
						.addFields(
							{ name: 'Title (click to open store link)', value: titles.join('\n'), inline: true },
							{ name: 'Cuts', value: cuts.join('\n'), inline: true },
						)
						.setFooter({ text: `Listed ${ items.length } items.` })
						.setTimestamp()
				]
			});

			BotUtils.SysLog('Embed sent!\n');
		})
		.catch((err) => {
			BotUtils.ErrLog(err.message);
			message.reply(BotUtils.ErrMessage);
		});

	message.reply(`Getting you the hottest deals from across the web 🌍...`);
};

module.exports = deals;