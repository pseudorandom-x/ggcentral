const fetch = require('node-fetch');

const { EmbedBuilder } = require('discord.js');

const BotUtils = require('../../utils/util');

const check = async function(cmdArr, message) {
	if (cmdArr[1] === undefined) {
		message.reply(`'check' command requires an additional parameter - a Steam appid (refer to my manual to find it).`);
		return;
	}

	const appid = Number(cmdArr[1]);
	BotUtils.SysLog(appid);

	if (appid === NaN) {
		message.reply(`Whoops, looks like ${ cmdArr[1] } has a typo or is an incorrect Steam appid.`);
		return;
	}

	let plain;
	let fullName;
	let headerImg;

	// ITAD plain for requested Steam appid
	await fetch(`https://api.isthereanydeal.com/v02/game/plain/?key=${ process.env.ITAD_KEY }&shop=steam&game_id=app%2F${ appid }`)
		.then(res => res.json())
		.then(res => {
			plain = res['.meta'].match === 'false' ? '' : res.data.plain;

			if (plain === '')
				throw new Error('Unresolved appid');

			BotUtils.SysLog(`ITAD plain=${ plain } ok. Fetching full name, header image...`);
			return fetch(`https://store.steampowered.com/api/appdetails?appids=${ appid }`)
		})
		.then(res => res.json())
		.then(res => {
			fullName = res[appid].data.name;
			headerImg = res[appid].data.header_image;
		})
		.catch(err => {
			BotUtils.ErrLog(err.message);
		});

	BotUtils.SysLog(`${ fullName }, ${ headerImg }: Game info received. Fetching prices...`);

	// current prices
	fetch(`https://api.isthereanydeal.com/v01/game/prices/?key=${ process.env.ITAD_KEY }&plains=${ plain }&shops=steam%2Cgog%2Cgreenmangaming%2Cgamebillet%2Cepic%2Camazonus%2Corigin%2Cgamesplanet%2Chumblestore%2Cmicrosoft`)
		.then(res => res.json())
		.then(res => {

			const shopList = res.data[plain].list;
			const shopNames = [];
			const prices = [];
			const cuts = [];

			for (const item of shopList) {
				shopNames.push(`[${ item.shop.name } 🔗](${ item.url })`);
				prices.push(`${ item.price_new }`);
				cuts.push(`${ item.price_cut || '--' }`);
			}

			BotUtils.SysLog('Parsed app info. Formatting embed...');

			message.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(fullName)
						.setDescription(`Here are the results. ${ shopList.length } store(s) have the game you want.`)
						.addFields(
							{ name: 'Store name', value: shopNames.join('\n'), inline: true },
							{ name: 'Current price ($)', value: prices.join('\n'), inline: true },
							{ name: 'Price cuts (%)', value: cuts.join('\n'), inline: true },
						)
						.setImage(headerImg)
						.setTimestamp()
				],
			});

			BotUtils.SysLog('Embed sent!\n');
		})
		.catch(err => {
			BotUtils.ErrLog(err.message);

			message.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('Aw, snap!')
						.setImage(BotUtils.awSnapImg)
						.setDescription(BotUtils.ErrMessage)
						.setFooter('Please try again...')
						.setTimestamp()
				],
			});
		});

	message.reply(`Roger, ${ message.author.username }, getting the status of the game you requested...`);
}

module.exports = check;