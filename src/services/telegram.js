const config = require('../config');
const axios = require('axios');

const TELEGRAM_TOKEN = config.telegram.token;
const TELEGRAM_CHAT_ID = config.telegram.chatId;
const TELEGRAM_SEND_MESSAGE = config.telegram.sendMessage;
const TELEGRAM_URL = 'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage';

module.exports = {
	sendMessage,
};

async function sendMessage(content) {
	if (!TELEGRAM_SEND_MESSAGE || !content) return;

	let telegramMessage;

	try {
		telegramMessage = await axios.post(TELEGRAM_URL, {
			chat_id: TELEGRAM_CHAT_ID,
			text: content,
		});
	} catch (e) {
		return null;
	}
}
