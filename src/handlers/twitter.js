require('dotenv').config({ path: '../.env' });

const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_KEY,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
}).v2;

