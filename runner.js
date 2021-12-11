const config = {
	version: 'unknown'
};

const argv = process.argv.slice(0, 2);

process.argv.reduce((cmd, arg) => {
	if (cmd) {
		config[cmd] = arg;
		return;
	}

	if (arg.startsWith('--')) {
		const sub = arg.substring('--'.length);
		const splittedArg = sub.split('=');
		if (Object.keys(config).includes(splittedArg[0])) {
			if (splittedArg[1] !== null && splittedArg[1] !== undefined) {
				config[splittedArg[0]] = splittedArg[1];
				return;
			}
		}
	}
	argv.push(arg);
});

// Store configuration on env
process.env.__CONFIGURATION = JSON.stringify(config);

// Setting real ARGV
process.argv = argv;

// Calling jest runner
require('jest-cli/bin/jest');
