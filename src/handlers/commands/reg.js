const fetch = require('node-fetch');

const { EmbedBuilder } = require('discord.js');

const BotUtils = require('../../utils/util');

const MAX_GAMES = 8;

const register = async function(cmdArr, message) {
	let uname = cmdArr[1];

	let res = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${ process.env.STEAM_KEY }&vanityurl=${ uname }`)
		.then(res => res.json())
		.then(res => {
				if (res.response.success === 1)
				uname = res.response.steamid;

				return fetch(`https://store.steampowered.com/wishlist/profiles/${ uname }/wishlistdata/`);
			})
		.then(res => res.json())
		.then(res => {
			if (res.success === 2)
			throw new Error('Error registering user.');

			// Wishlist ok
			message.reply(`Roger, ${ message.author.username }. Registering your wishlist in my mind 🧠...`);
			return res;
		})
		.catch((err) => {
			BotUtils.ErrLog(err.message);
			message.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle('Aw, snap!')
						.setThumbnail(BotUtils.awSnapImg)
						.setDescription(BotUtils.ErrMessage)
						.addFields(
							{
								name: 'Request failed',
								value: `This could be due to:\n• Typo in your steam64ID / profile name\n• Your profile isn't public\n• Steam servers are down`,
								inline: true,
							}
						)
						.setFooter({ text: 'Maybe... try again?' })
						.setTimestamp()
				]
			});
			return undefined;
		});

	console.log(res);
	BotUtils.SysLog('Wishlist URL accessible. Parsing...');

	let i = 0;
	let dct = null;
	const titles = [];
	const cuts = [];
	let firstApp = '';
	let headerImg = 'https://i.imgur.com/erAAai2.jpg';

	for (const [appid, value] of Object.entries(res)) {
		if (i <= MAX_GAMES) {
			titles.push(`[${ value.name } 🔗](https://store.steampowered.com/app/${ appid }/)`)
			dct = value.subs;
			cuts.push(`${ dct[0].discount_pct || '--' }%`);
		}
		++i;

		if (i === 1)
			headerImg = value.capsule;
	}
	let footer = i > MAX_GAMES ? 'Wishlist registered. Showing first 8 titles.' : `Registered all ${ i } titles.`;

	BotUtils.SysLog('Wishlist registered. Formatting embed...');

	message.reply({
		embeds: [
			new EmbedBuilder()
				.setColor(0xFF10F0)
				.setTitle('__Apps registered into my mind__')
				.addFields(
					{ name: 'Titles', value: titles.join('\n'), inline: true },
					{ name: 'Price cuts (%)', value: cuts.join('\n'), inline: true },
				)
				.setImage(headerImg)
				.setFooter({ text: footer })
				.setTimestamp()
		]
	});

	BotUtils.SysLog('Embed sent!\n');
}

module.exports = register;