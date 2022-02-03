import express, { Router } from 'express';

import { baseRoute } from './base';
import { getLoginApi } from './login';
import { usersRoutes } from './users';

const getApiController = (): Router => {
	const router = express.Router();

	router.use('/', baseRoute());
	router.use('/users', usersRoutes());
	router.use('/login', getLoginApi());

	return router;
};

export { getApiController };
