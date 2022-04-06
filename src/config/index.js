require('dotenv').config();

module.exports = {
	telegram: {
		token: process.env.TELEGRAM_TOKEN,
		chatId: process.env.TELEGRAM_CHAT_ID,
		sendMessage: process.env.TELEGRAM_SEND_MESSAGE,
	},
};
