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
		'CHANNEL' // Required to receive DMs
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

// const handleCommand = async (content, message) => {
// 	const cmdArr = content.split(' ');

// 	if (cmdArr[0] === 'deals') {
// 		let x = 'Steam';
// 		let shops = 'steam';

// 		if (cmdArr[1] !== undefined) {
// 			if (cmdArr[1] === '-a') {
// 				x = 'the web';
// 				shops = ['steam', 'gog', 'g2a', 'gmg', 'humblebundle'].join('%2C');
// 			}
// 			else {
// 				shops = cmdArr[1].split(',').join('%2C');
// 			}
// 		}

// 		fetch(`https://api.isthereanydeal.com/v01/deals/list/?key=${ process.env.ITAD_KEY }&limit=8&shops=${ shops }&sort=cut%3Adesc`)
// 			.then(res => res.json())
// 			.then(res => {
// 				const titles = [];
// 				const cuts = [];
// 				const items = res.data.list;

// 				for (const item of items) {
// 					titles.push(`[${ item.title }](${ item.urls.buy })`);
// 					cuts.push(item.price_cut);
// 				}

// 				BotUtils.SysLog('Grabbed deals. Formatting embed...');

// 				message.reply({
// 					embeds: [
// 						new EmbedBuilder()
// 							.setColor(0xFF10F0)
// 							.setTitle('__Top 5 deals currently__')
// 							.addFields(
// 								{ name: 'Title (click to open store link)', value: titles.join('\n'), inline: true },
// 								{ name: 'Cuts', value: cuts.join('\n'), inline: true },
// 							)
// 					]
// 				});

// 				BotUtils.SysLog('Embed sent!\n');
// 			})
// 			.catch((err) => {
// 				BotUtils.ErrLog(err.message);
// 				message.reply(BotUtils.ErrMessage);
// 			});

// 		message.reply(`Getting you the hottest deals from across the web...`);
// 		return;
// 	}

// 	if (cmdArr[0] === 'reg') {
// 		let uname = content.slice(4).trim();

// 		fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${ process.env.STEAM_KEY }&vanityurl=${ uname }`)
// 			.then(res => res.json())
// 			.then(res => {
// 				if (res.response.success === 1)
// 					uname = res.response.steamid;

// 				return fetch(`https://store.steampowered.com/wishlist/profiles/${ uname }/wishlistdata/`);
// 			})
// 			.then(res => res.json())
// 			.then(res => {
// 				// register games from wishlist
// 				if (res.success === 2)
// 					throw new Error('Error registering user.');

// 				BotUtils.SysLog('Wishlist URL accessible. Parsing...');

// 				let i = 0;
// 				let dct = null;
// 				const titles = [];
// 				const cuts = [];
// 				const MAX_GAMES = 8;

// 				for (const [appid, value] of Object.entries(res)) {
// 					if (i <= MAX_GAMES) {
// 						titles.push(`[${ value.name }](https://store.steampowered.com/app/${ appid }/)`)
// 						dct = value.subs;
// 						cuts.push(`${ dct[0].discount_pct || '--' }%`);
// 					}
// 					++i;
// 				}

// 				BotUtils.SysLog('Wishlist registered. Formatting embed...');

// 				message.reply({
// 					embeds: [
// 						new EmbedBuilder()
// 							.setColor(0xFF10F0)
// 							.setTitle('__Apps registered into my mind__')
// 							.addFields(
// 								{ name: 'Titles', value: titles.join('\n'), inline: true },
// 								{ name: 'Price cuts', value: cuts.join('\n'), inline: true },
// 							)
// 					]
// 				});

// 				BotUtils.SysLog('Embed sent!\n');
// 			})
// 			.catch((err) => {
// 				BotUtils.ErrLog(err.message);
// 				message.reply({
// 					embeds: [
// 						new EmbedBuilder()
// 							.setTitle('Aw, snap!')
// 							.setThumbnail(BotUtils.awSnapImg)
// 							.setDescription(BotUtils.ErrMessage)
// 							.addFields(
// 								{
// 									name: 'Request failed',
// 									value: `This could be due to:\n• Typo in your steam64ID / profile name\n• Your profile isn't public\n• Steam servers are down`,
// 									inline: true,
// 								}
// 							)
// 							.setFooter({ text: 'Please try again...' })
// 					]
// 				});
// 			});

// 		message.reply(`Roger, ${ message.author.username }. Registering your wishlist in my mind (ง •̀_•́)ง`);
// 	}

// 	if (cmdArr[0] === 'check') {
// 		if (cmdArr[1] === undefined) {
// 			message.reply(`'check' command requires an additional parameter - a Steam appid (refer to my manual to find it).`);
// 			return;
// 		}

// 		const appid = Number(cmdArr[1]);
// 		BotUtils.SysLog(appid);

// 		if (appid === NaN) {
// 			message.reply(`Whoops, looks like ${ cmdArr[1] } has a typo or is an incorrect Steam appid.`);
// 			return;
// 		}

// 		let plain;
// 		let fullName;
// 		let headerImg;

// 		// ITAD plain for requested Steam appid
// 		await fetch(`https://api.isthereanydeal.com/v02/game/plain/?key=${ process.env.ITAD_KEY }&shop=steam&game_id=app%2F${ appid }`)
// 			.then(res => res.json())
// 			.then(res => {
// 				plain = res['.meta'].match === 'false' ? '' : res.data.plain;

// 				if (plain === '')
// 					throw new Error('Unresolved appid');

// 				BotUtils.SysLog(`ITAD plain=${ plain } ok. Fetching full name, header image...`);
// 				return fetch(`https://store.steampowered.com/api/appdetails?appids=${ appid }`)
// 			})
// 			.then(res => res.json())
// 			.then(res => {
// 				fullName = res[appid].data.name;
// 				headerImg = res[appid].data.header_image;
// 			})
// 			.catch(err => {
// 				BotUtils.ErrLog(err.message);
// 			});

// 		BotUtils.SysLog(`${ fullName }, ${ headerImg }: Game info received. Fetching prices...`);

// 		// current prices
// 		fetch(`https://api.isthereanydeal.com/v01/game/prices/?key=${ process.env.ITAD_KEY }&plains=${ plain }&shops=steam%2Cgog%2Cgreenmangaming%2Cgamebillet%2Cepic%2Camazonus%2Corigin%2Cgamesplanet%2Chumblestore%2Cmicrosoft`)
// 			.then(res => res.json())
// 			.then(res => {
// 				// BotUtils.SysLog(res.hasOwnProperty('data'));
// 				// console.log(res.data[plain].list[0]);
// 				// return;

// 				const shopList = res.data[plain].list;
// 				const shopNames = [];
// 				const prices = [];
// 				const cuts = [];

// 				for (const item of shopList) {
// 					shopNames.push(`[${ item.shop.name } 🔗](${ item.url })`);
// 					prices.push(`${ item.price_new }`);
// 					cuts.push(`${ item.price_cut || '--' }`);
// 				}

// 				BotUtils.SysLog('Parsed app info. Formatting embed...');

// 				message.reply({
// 					embeds: [
// 						new EmbedBuilder()
// 							.setTitle(fullName)
// 							.setDescription(`Here are the results. ${ shopList.length } store(s) have the game you want.`)
// 							.addFields(
// 								{ name: 'Store name', value: shopNames.join('\n'), inline: true },
// 								{ name: 'Current price ($)', value: prices.join('\n'), inline: true },
// 								{ name: 'Price cuts (%)', value: cuts.join('\n'), inline: true },
// 							)
// 							.setImage(headerImg)
// 					],
// 				});

// 				BotUtils.SysLog('Embed sent!\n');
// 			})
// 			.catch(err => {
// 				BotUtils.ErrLog(err.message);

// 				message.reply({
// 					embeds: [
// 						new EmbedBuilder()
// 							.setTitle('Aw, snap!')
// 							.setImage(BotUtils.awSnapImg)
// 							.setDescription(BotUtils.ErrMessage)
// 							.setFooter('Please try again...')
// 					],
// 				});
// 			});

// 		message.reply(`Roger, ${ message.author.username }, getting the status of the game you requested...`);
// 		return;
// 	}
// };