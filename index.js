const config = require('./src/config');
const goiko = require('./src/services/goiko');
const telegram = require('./src/services/telegram');

async function cli() {
	// Get period
	const argv = process.argv;
	const period = argv[argv.length - 1];

	// Check valid periods
	const validPeriods = ['daily', 'weekly'];
	if (validPeriods.indexOf(period) === -1) {
		return console.error(`"${period}" period not valid`);
	}

	// Get contents
	const menu = await goiko.getGoikoMenu();
	if (!menu) {
		return console.error('Could not get Goiko menu');
	}

	// Parse content
	const parsedMenu = goiko.parseMenu(menu);
	
	// Burger by day
	const menuByDay = goiko.matchMenuToDays(parsedMenu);

	// Get content by period
	let content = '';
	if (period === 'daily') {
		const today = menuByDay[0];
		content = `La hamburguesa del ${today.day.toLowerCase()} es ${today.burger}`;
	}

	if (period === 'weekly') {
		content += 'Las hamburguesas de la semana:';

		menuByDay.forEach(weekday => {
			content += `\r\n- ${weekday.day}: ${weekday.burger}`;
		});
	}

	if (!content) {
		return console.error('Could not get content');
	}

	console.log(content);

	// Send telegram
	if (config.telegram.sendMessage) {
		const sentMessage = await telegram.sendMessage(content);
		if (!sentMessage) {
			console.log('Telegram message sent');
		} else {
			console.error('Telegram message could not be sent');
		}
	}
}

module.exports = cli();
