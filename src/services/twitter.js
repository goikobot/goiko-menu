const config = require('../config');
const { TwitterClient } = require('twitter-api-client')

const TWITTER_API_KEY = config.twitter.apiKey;
const TWITTER_API_SECRET = config.twitter.apiSecret;
const TWITTER_ACCESS_TOKEN = config.twitter.accessToken;
const TWITTER_ACCESS_TOKEN_SECRET = config.twitter.accessTokenSecret;
const TWITTER_SEND_TWEET = config.twitter.sendTweet;

module.exports = {
	tweet,
}

async function tweet(message) {
	if (!TWITTER_SEND_TWEET || !message) return;

	const twitterClient = new TwitterClient({
		apiKey: TWITTER_API_KEY,
		apiSecret: TWITTER_API_SECRET,
		accessToken: TWITTER_ACCESS_TOKEN,
		accessTokenSecret: TWITTER_ACCESS_TOKEN_SECRET
	});

	try {
		await twitterClient.tweets.statusesUpdate({ status: message });
	} catch (e) {
		return false;
	}

	return true;
}
