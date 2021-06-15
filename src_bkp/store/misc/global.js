export const validation = {
	isNull: (value) => value === undefined || value.length === 0,
	isUnderSize: (minLength) => (value = "") => value.length < minLength,
	isOverSize: (maxLength) => (value = "") => value.length > maxLength,
	isNotNumber: (value) => isNaN(value),
};

export var objFilter = function (obj, predicate) {
	let result = {},
		key;

	for (key in obj) {
		if (predicate(key, obj[key])) {
			result[key] = obj[key];
		}
	}

	return result;
};

const citiesCollection = require("../pk.json").map((cityDetails) => {
	return cityDetails.city + ", " + cityDetails.admin_name;
});
export const cities = citiesCollection;

export const notificationType = {
	green: "green",
	yellow: "yellow",
	red: "red",
};
