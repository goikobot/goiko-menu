require('dotenv').config();

module.exports = {
	telegram: {
		token: process.env.TELEGRAM_TOKEN,
		chatId: process.env.TELEGRAM_CHAT_ID,
		sendMessage: process.env.TELEGRAM_SEND_MESSAGE,
	},
	twitter: {
		apiKey: process.env.TWITTER_API_KEY,
		apiSecret: process.env.TWITTER_API_SECRET,
		accessToken: process.env.TWITTER_ACCESS_TOKEN,
		accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
		sendTweet: process.env.TWITTER_SEND_TWEET,
	}
};
