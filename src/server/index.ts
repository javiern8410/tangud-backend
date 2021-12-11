import cluster from 'cluster';
import logger from 'loglevel';
import os from 'os';
import { LogLevel } from 'ts-loader/dist/logger';

import { startServer } from './start';

const numCPUs = os.cpus().length;
const isProduction = process.env.NODE_ENV === 'production';
const logLevel =
	LogLevel[process.env.LOG_LEVEL] || (isProduction ? logger.levels.INFO : logger.levels.DEBUG);

logger.setLevel(logLevel);

if (cluster.isMaster) {
	logger.debug(`Master ${process.pid} is running`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', worker => {
		logger.debug(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	startServer();
}
