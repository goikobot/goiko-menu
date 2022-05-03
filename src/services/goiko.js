const axios = require('axios');

const GOIKO_URL = 'https://www.goiko.com/menu-del-dia/';

module.exports = {
	getGoikoMenu,
	parseMenu,
	getTodaysBurger,
	matchMenuToDays,
};

function _getStringsBetweenTwoStrings(content, firstString, lastString) {
	if (!content) return null;

	return content.substring(
		content.lastIndexOf(firstString), 
		content.lastIndexOf(lastString)
	);
}

function _daysOrder() {
	const date = new Date();
	const todayWeekDay = date.getDay();

	let weekDayIndex = 0;
	const weekDaysString = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
	const weekDaysOrdered = [];

	switch (todayWeekDay) {
		case 1:
			weekDayIndex = 0;
			break;
		case 2:
			weekDayIndex = 1;
			break;
		case 3:
			weekDayIndex = 2;
			break;
		case 4:
			weekDayIndex = 3;
			break;
		case 5:
			weekDayIndex = 4;
			break;
		default:
			weekDayIndex = 0;
			break;
	}

	weekDaysOrdered.push(...weekDaysString.slice(weekDayIndex));
	weekDaysOrdered.push(...weekDaysString.slice(0, weekDayIndex));

	return weekDaysOrdered;
}

// Gets "El de siempre" menu
async function getGoikoMenu() {
	let request;

	try {
		request = await axios.get(GOIKO_URL);
	} catch (e) {
		console.error(e);
		return null;
	}

	return (request && request.data || null);
}

function parseMenu(menu) {
	if (!menu) return null;

	// Get main block
	const siempreMenu = _getStringsBetweenTwoStrings(menu, '<div class="daily-swiper1"', '<div class="whatsapp-footer">');

	// Get all regex burger names
	const burgerNamesMatches = siempreMenu.matchAll(/>Hamburguesa (.*?)<\/a>/g);
	const burgerNamesMatchesArray = [...burgerNamesMatches];

	const burgerNames = burgerNamesMatchesArray.map(k => {
		return k[1];
	});

	return burgerNames;
}

function getTodaysBurger(burgerNames) {
	if (!burgerNames || !burgerNames.length) return null;

	return burgerNames[0];
}

function matchMenuToDays(burgerNames) {
	if (!burgerNames || !burgerNames.length) return null;

	const daysOrder = _daysOrder();

	const menuByDay = burgerNames.map((burger, i) => {
		return {
			burger,
			day: daysOrder[i],
		};
	});

	return menuByDay;
}
