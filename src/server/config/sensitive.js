const propertiesReader = require('properties-reader');

const env = (process.env.NODE_ENV || '').toUpperCase();

let sensitiveProperties = {};

try {
	let reader = propertiesReader('sensitive.conf');
	reader.each((key, value) => {
		sensitiveProperties[key] = value;
	});
} catch (e) {
	console.log('Sin sensitive conf');
}

export default sensitiveProperties;
