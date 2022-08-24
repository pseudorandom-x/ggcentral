<h1 align="center">
ggcentral - a Discord bot for all things video games 🎮
</h1>

### ggcentral, or ggc-bot is a Discord bot written in JavaScript's Node runtime, and powered by the Discord.js library (check it out [here](https://github.com/discordjs/discord.js) and [here](https://discordjs.guide/)).

So what does it do exactly? Glad you asked. I've purposefully made it to be extensible and customizable, adding only the features that I thought were missing from the usual bots, or features that were exciting enough that made go 'why not?'. And the features themselves? Well, have a look at them for yourself.

* Get all the deals currently from across the web on any game. Since names can vary wildly, the bot can currently only accepts Steam's appIDs. These IDs are displayed in the Steam's store links:

![Screenshot_567](https://user-images.githubusercontent.com/99959625/185499743-87c03dd1-216a-44b1-a025-a918f29e725c.png)
  * Usage: `gg!check [steamAppID]` (yup, commands have to start with `gg!`)

![Screenshot_565](https://user-images.githubusercontent.com/99959625/185499114-f6918e43-4799-4d57-a571-9a3309bc087f.png)

* Check for the most 'bang-for-buck' deals from across stores like Steam, Epic, Origin, GOG, etc. Games by default are listed by their discounts, sorted descending.
  * Usage: `gg!deals`, OR
  * `gg!deals -a` to list deals from across all supported stores, OR
  * `gg!deals epic,gog` to list from stores mentioned (should be given as comma-separated string without spaces).

![Screenshot_569](https://user-images.githubusercontent.com/99959625/185500558-cd182d0a-9b5a-416a-b369-c37c886bb0a2.png)

* Register your Steam wishlist and get notified (either by DMs or via the server) whenever any item from your list goes on sale.

![Screenshot_566](https://user-images.githubusercontent.com/99959625/185500887-49d66dba-0a7b-4de6-9ee5-f3efd8dc5aaf.png)

* TODO:
  * [ ] Add functionality to user registration
  * [ ] Add alerts from r/GameDeals
