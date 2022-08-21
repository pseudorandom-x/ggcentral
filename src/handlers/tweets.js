require('dotenv').config({ path: '../.env' });

const { ETwitterStreamEvent, ETwitterApiError, TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

// return a TweetStream not wrapped in Promise
const stream = client.v2.searchStream({ autoConnect: false });

async function twitterHandler()
{
  // attach handlers
  stream.on(
    ETwitterStreamEvent.Error,
    err => console.log(err)
  );

  stream.on(
    ETwitterStreamEvent.ConnectionClosed,
    err => {
      console.log(`Stream connection closed unexpectedly.`);
      console.log(err);
    }
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
  );

  // connect Stream
  await stream.connect({
    autoReconnect: true,
    autoReconnectRetries: Infinity,
  });

  const rules = await client.v2.streamRules();
  console.log(`Connected stream to filtered stream with the following rules:`);
  console.log(rules);
}

module.exports = twitterHandler;