import logger from 'loglevel';
import mongoose from 'mongoose';

import config from '../../config';

const user = config.sensitive['mongo.user'];
const pass = config.sensitive['mongo.pass'];

const urls = config.db.mongo.urls;
const db = config.db.mongo.db;
const replicaSet = config.db.mongo.replicaSet;

const authString = !!user && !!pass && `${user}:${encodeURIComponent(pass)}@`;

const connectionString = `mongodb://${
	authString ? authString : ''
}${urls}/${db}?connectTimeoutMS=20000&socketTimeoutMS=20000&maxPoolSize=10${
	replicaSet ? `&replicaSet=${replicaSet}` : ''
}`;

export const connectDB = (): Promise<void> =>
	mongoose
		.connect(connectionString)
		.then(() => {
			logger.info('Database connected');
		})
		.catch((err) => logger.error(err));

export const closeDB = (): Promise<void> => mongoose.connection.close();
