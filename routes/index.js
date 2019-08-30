const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');

const gNUE = (data)=> {
	if (data === 'undefined' || data === undefined || data === 'null' || data === null) {
		data = '';
	} else if (typeof (data) == 'undefined' || typeof (data) == undefined || typeof (data) == 'null' || typeof (data) == null) {
		data = '';
	} else if (typeof (data) === 'undefined' || typeof (data) === undefined || typeof (data) === 'null' || typeof (data) === null) {
		data = '';
	}
	return data;
}

const list = [{ "name": "Pacific/Midway", "time": "(GMT-11:00) Midway Island, Samoa" }, { "name": "America/Adak", "time": "(GMT-10:00) Hawaii-Aleutian" }, { "name": "Etc/GMT+10", "time": "(GMT-10:00) Hawaii" }, { "name": "Pacific/Marquesas", "time": "(GMT-09:30) Marquesas Islands" }, { "name": "Pacific/Gambier", "time": "(GMT-09:00) Gambier Islands" }, { "name": "America/Anchorage", "time": "(GMT-09:00) Alaska" }, { "name": "America/Ensenada", "time": "(GMT-08:00) Tijuana, Baja California" }, { "name": "Etc/GMT+8", "time": "(GMT-08:00) Pitcairn Islands" }, { "name": "America/Los_Angeles", "time": "(GMT-08:00) Pacific Time (US & Canada)" }, { "name": "America/Denver", "time": "(GMT-07:00) Mountain Time (US & Canada)" }, { "name": "America/Chihuahua", "time": "(GMT-07:00) Chihuahua, La Paz, Mazatlan" }, { "name": "America/Dawson_Creek", "time": "(GMT-07:00) Arizona" }, { "name": "America/Belize", "time": "(GMT-06:00) Saskatchewan, Central America" }, { "name": "America/Cancun", "time": "(GMT-06:00) Guadalajara, Mexico City, Monterrey" }, { "name": "Chile/EasterIsland", "time": "(GMT-06:00) Easter Island" }, { "name": "America/Chicago", "time": "(GMT-06:00) Central Time (US & Canada)" }, { "name": "America/New_York", "time": "(GMT-05:00) Eastern Time (US & Canada)" }, { "name": "America/Havana", "time": "(GMT-05:00) Cuba" }, { "name": "America/Bogota", "time": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco" }, { "name": "America/Caracas", "time": "(GMT-04:30) Caracas" }, { "name": "America/Santiago", "time": "(GMT-04:00) Santiago" }, { "name": "America/La_Paz", "time": "(GMT-04:00) La Paz" }, { "name": "Atlantic/Stanley", "time": "(GMT-04:00) Faukland Islands" }, { "name": "America/Campo_Grande", "time": "(GMT-04:00) Brazil" }, { "name": "America/Goose_Bay", "time": "(GMT-04:00) Atlantic Time (Goose Bay)" }, { "name": "America/Glace_Bay", "time": "(GMT-04:00) Atlantic Time (Canada)" }, { "name": "America/St_Johns", "time": "(GMT-03:30) Newfoundland" }, { "name": "America/Araguaina", "time": "(GMT-03:00) UTC-3" }, { "name": "America/Montevideo", "time": "(GMT-03:00) Montevideo" }, { "name": "America/Miquelon", "time": "(GMT-03:00) Miquelon, St. Pierre" }, { "name": "America/Godthab", "time": "(GMT-03:00) Greenland" }, { "name": "America/Argentina/Buenos_Aires", "time": "(GMT-03:00) Buenos Aires" }, { "name": "America/Sao_Paulo", "time": "(GMT-03:00) Brasilia" }, { "name": "America/Noronha", "time": "(GMT-02:00) Mid-Atlantic" }, { "name": "Atlantic/Cape_Verde", "time": "(GMT-01:00) Cape Verde Is." }, { "name": "Atlantic/Azores", "time": "(GMT-01:00) Azores" }, { "name": "Europe/Belfast", "time": "(GMT) Greenwich Mean Time : Belfast" }, { "name": "Europe/Dublin", "time": "(GMT) Greenwich Mean Time : Dublin" }, { "name": "Europe/Lisbon", "time": "(GMT) Greenwich Mean Time : Lisbon" }, { "name": "Europe/London", "time": "(GMT) Greenwich Mean Time : London" }, { "name": "Africa/Abidjan", "time": "(GMT) Monrovia, Reykjavik" }, { "name": "Europe/Amsterdam", "time": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna" }, { "name": "Europe/Belgrade", "time": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague" }, { "name": "Europe/Brussels", "time": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris" }, { "name": "Africa/Algiers", "time": "(GMT+01:00) West Central Africa" }, { "name": "Africa/Windhoek", "time": "(GMT+01:00) Windhoek" }, { "name": "Asia/Beirut", "time": "(GMT+02:00) Beirut" }, { "name": "Africa/Cairo", "time": "(GMT+02:00) Cairo" }, { "name": "Asia/Gaza", "time": "(GMT+02:00) Gaza" }, { "name": "Africa/Blantyre", "time": "(GMT+02:00) Harare, Pretoria" }, { "name": "Asia/Jerusalem", "time": "(GMT+02:00) Jerusalem" }, { "name": "Europe/Minsk", "time": "(GMT+02:00) Minsk" }, { "name": "Asia/Damascus", "time": "(GMT+02:00) Syria" }, { "name": "Europe/Moscow", "time": "(GMT+03:00) Moscow, St. Petersburg, Volgograd" }, { "name": "Africa/Addis_Ababa", "time": "(GMT+03:00) Nairobi" }, { "name": "Asia/Tehran", "time": "(GMT+03:30) Tehran" }, { "name": "Asia/Dubai", "time": "(GMT+04:00) Abu Dhabi, Muscat" }, { "name": "Asia/Yerevan", "time": "(GMT+04:00) Yerevan" }, { "name": "Asia/Kabul", "time": "(GMT+04:30) Kabul" }, { "name": "Asia/Yekaterinburg", "time": "(GMT+05:00) Ekaterinburg" }, { "name": "Asia/Tashkent", "time": "(GMT+05:00) Tashkent" }, { "name": "Asia/Kolkata", "time": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi" }, { "name": "Asia/Katmandu", "time": "(GMT+05:45) Kathmandu" }, { "name": "Asia/Dhaka", "time": "(GMT+06:00) Astana, Dhaka" }, { "name": "Asia/Novosibirsk", "time": "(GMT+06:00) Novosibirsk" }, { "name": "Asia/Rangoon", "time": "(GMT+06:30) Yangon (Rangoon)" }, { "name": "Asia/Bangkok", "time": "(GMT+07:00) Bangkok, Hanoi, Jakarta" }, { "name": "Asia/Krasnoyarsk", "time": "(GMT+07:00) Krasnoyarsk" }, { "name": "Asia/Hong_Kong", "time": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi" }, { "name": "Asia/Irkutsk", "time": "(GMT+08:00) Irkutsk, Ulaan Bataar" }, { "name": "Australia/Perth", "time": "(GMT+08:00) Perth" }, { "name": "Australia/Eucla", "time": "(GMT+08:45) Eucla" }, { "name": "Asia/Tokyo", "time": "(GMT+09:00) Osaka, Sapporo, Tokyo" }, { "name": "Asia/Seoul", "time": "(GMT+09:00) Seoul" }, { "name": "Asia/Yakutsk", "time": "(GMT+09:00) Yakutsk" }, { "name": "Australia/Adelaide", "time": "(GMT+09:30) Adelaide" }, { "name": "Australia/Darwin", "time": "(GMT+09:30) Darwin" }, { "name": "Australia/Brisbane", "time": "(GMT+10:00) Brisbane" }, { "name": "Australia/Hobart", "time": "(GMT+10:00) Hobart" }, { "name": "Asia/Vladivostok", "time": "(GMT+10:00) Vladivostok" }, { "name": "Australia/Lord_Howe", "time": "(GMT+10:30) Lord Howe Island" }, { "name": "Etc/GMT-11", "time": "(GMT+11:00) Solomon Is., New Caledonia" }, { "name": "Asia/Magadan", "time": "(GMT+11:00) Magadan" }, { "name": "Pacific/Norfolk", "time": "(GMT+11:30) Norfolk Island" }, { "name": "Asia/Anadyr", "time": "(GMT+12:00) Anadyr, Kamchatka" }, { "name": "Pacific/Auckland", "time": "(GMT+12:00) Auckland, Wellington" }, { "name": "Etc/GMT-12", "time": "(GMT+12:00) Fiji, Kamchatka, Marshall Is." }, { "name": "Pacific/Chatham", "time": "(GMT+12:45) Chatham Islands" }, { "name": "Pacific/Tongatapu", "time": "(GMT+13:00) Nuku'alofa" }, { "name": "Pacific/Kiritimati", "time": "(GMT+14:00) Kiritimati" }];
router.get('/',  (req, res, next) => {
	res.render('index', { title: 'Time', list: list });
});

router.post('/time',  (req, res, next) => {
	try {
		const userData = req.body;
		let datetime = gNUE(userData.datetime);
		const timezone = userData.timezone;
		const convertto = gNUE(userData.convertto);

		let html = "";
		if (datetime != '') {
			datetime = datetime.trim(); // 20 01 1990 08:03:00 working rest two lnes nt wrkng
			datetime = new Date(datetime.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
			datetime = moment.utc(datetime);
		}

		if (convertto != '') {
			const m = moment.utc(datetime, "DD-MM-YYYY h:mm:ss"); // parse input as UTC
			const tz = convertto;
			const convertedTime = m.utc().tz(tz).format("DD-MM-YYYY h:mm:ss A");
			html += "<br><br><h3> Requested : " + convertedTime + " :--: " + convertto + "</h3><br><br> ";
		}

		for (let i in list) {
			let mm = moment.utc(datetime, "DD-MM-YYYY h:mm:ss A"); // parse input as UTC
			let tzz = list[i].name;
			let convertedTime = mm.utc().tz(tzz).format("DD-MM-YYYY h:mm:ss A");
			html += convertedTime + " :--:  " + list[i].time + " <br> ";
		}
		res.json({ html: html });
	} catch (e) {
		console.log(e, 'Error...............');
		res.json(e);
	}
});

module.exports = router;