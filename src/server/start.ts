import 'express-async-errors';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { create } from 'express-handlebars';
import expressRequestId from 'express-request-id';
import logger from 'loglevel';
import path from 'path';

import config from './config';
import { getRoutes } from './controller';
import errorMiddleware from './middleware/error';

process.env.DEFAULT_PORT = '4000';

const PUBLIC_CONTEXT = '/../public';
const VIEWS_PATH = path.join(__dirname, './views');

const startServer = (port = process.env.PORT || process.env.DEFAULT_PORT): Promise<any> => {
	const app = express();

	app.use(cors());

	app.use(config['static-context'], express.static(path.join(__dirname, PUBLIC_CONTEXT)));

	/* HANDLEBARS */

	const hbs = create({
		extname: '.html',
		partialsDir: VIEWS_PATH,
		layoutsDir: path.join(VIEWS_PATH, '/layouts'),
		helpers: {
			'static-context': () => config['static-context'],
			toJSON: object => JSON.stringify(object)
		}
	})
	app.set('views', VIEWS_PATH);
	app.engine('.html',hbs.engine);
	app.set('view engine', '.html');

	/* HANDLEBARS */

	app.use(expressRequestId());

	/* BODY PARSER */
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(express.text());
	app.use(express.raw());
	/* BODY PARSER */

	app.use(compression());

	app.use(cookieParser());
	app.use(errorMiddleware);
	app.use('/', getRoutes());

	return new Promise(resolve => {
		const server: any = app.listen(port, () => {
			logger.info(`Listening on port ${server.address().port}`);
			const originalClose = server.close.bind(server);
			server.close = () => {
				return new Promise(resolveClose => {
					originalClose(resolveClose);
				});
			};
			setupCloseOnExit(server);
			resolve(server);
		});
	});
};

const setupCloseOnExit = (server: any) => {
	const exitHandler = async (options: { exit?: boolean } = {}) => {
		await server
			.close()
			.then(() => {
				logger.info('Server successfully closed');
			})
			.catch(e => {
				logger.warn('Something went wrong closing the server', e.stack);
			});
		if (options.exit) {
			process.exit();
		}
	};

	// do something when app is closing
	process.on('exit', exitHandler);

	// catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, { exit: true }));

	// catches 'kill pid' (for example: nodemon restart)
	process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
	process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

	// catches uncaught exceptions
	process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};

export { startServer };
