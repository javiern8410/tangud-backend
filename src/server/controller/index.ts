import express, { Router } from 'express';

import config from '../config';
import { getApiController } from './api';
import { getDefaultController } from './default';
import { getHealthCheck } from './health-check';

const getRoutes = (): Router => {
	const router = express.Router();

	router.use('/health-check', getHealthCheck());
	router.use(config['api-context'], getApiController());
	router.use('/', getDefaultController());

	return router;
};

export { getRoutes };
