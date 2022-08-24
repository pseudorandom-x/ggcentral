require('dotenv').config({ path: '../.env' });

const sw = require('snoowrap');

const { SubmissionStream } = require('snoostorm');

const client = new sw({
  userAgent: 'ggc-bot: www.github.com/pseudorandom-x',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
});

const pollTime = 10000;

const submissionStream = new SubmissionStream(client, {
  subreddit: 'GameDeals',
  limit: 1,
  pollTime,
});

async function redditHandler()
{
  while (true) {
    try {
      submissionStream.on(
        'item',
        submission => {
          // search db and send to channels (upto 3 for one server)

          console.log('New user submission on r/GameDeals:');
          console.log(submission);
          console.log('----------------------\n');
        }
      );
    }
    catch(err) {
      console.log(err);
      console.log(`Connection to submission stream ended. Retrying after ${ pollTime / 1000 } seconds...`);
    }

    await sleep(pollTime);
  }
}

module.exports = redditHandler;