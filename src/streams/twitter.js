require('dotenv').config({ path: '../.env' });

const { ETwitterStreamEvent, ETwitterApiError, TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

const BotUtils = require('../utils/util');

// return a TweetStream not wrapped in Promise
const stream = client.v2.searchStream({ autoConnect: false });

async function twitterHandler()
{
  // attach handlers
  stream.on(
    ETwitterStreamEvent.Error,
    err => BotUtils.ErrLog(err, 'twitter')
  );

  stream.on(
    ETwitterStreamEvent.ConnectionClosed,
    err => {
      BotUtils.SysLog('Stream connection closed unexpectedly.', 'twitter');
      BotUtils.ErrLog(err, 'twitter');
    }
  );

  stream.on(
    ETwitterStreamEvent.ConnectionError,
    err => {
      BotUtils.SysLog('Connection error occured.', 'twitter');
      BotUtils.ErrLog(err, 'twitter');
    }
  );

  stream.on(
    ETwitterStreamEvent.Connected,
    () => BotUtils.SysLog('Connection established to Stream. Waiting for new tweets...', 'twitter')
  );

  stream.on(
    ETwitterStreamEvent.Data,
    data => {
      BotUtils.SysLog('Steam posted a new tweet.', 'twitter');
      console.log(data.data.text);
      console.log('\n');
    }
  );

  // connect Stream
  await stream.connect({
    autoReconnect: true,
    autoReconnectRetries: Infinity,
  });

  const rules = await client.v2.streamRules();
  BotUtils.SysLog('Connected stream to filtered stream with the following rules:', 'twitter');
  console.log(rules);
  console.log('------------------');
}

module.exports = twitterHandler;