require('dotenv').config({ path: '../.env' });

const { ETwitterStreamEvent, ETwitterApiError, TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function tweeter()
{
  const stream = await client.v2.searchStream();

  const rules = await client.v2.streamRules();
  console.log(rules);

  stream.on(
    ETwitterStreamEvent.Error,
    err => console.log(err)
  );

  stream.on(
    ETwitterStreamEvent.ConnectionError,
    err => {
      console.log(`Connection error:`);
      console.log(err);
    }
  );

  stream.on(
    ETwitterStreamEvent.Connected,
    () => console.log('Connection established. Listening for events...')
  );

  stream.on(
    ETwitterStreamEvent.Data,
    data => {
      console.log(`@Steam sent something!`);
      console.log(data);
    }
  )
}

module.exports = tweeter;