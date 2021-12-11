import express, { Router } from 'express';
import { baseRoute } from './base';

import { getLoginApi } from './login';

const getApiController = (): Router => {
	const router = express.Router();
	router.use('/', baseRoute());
	router.use('/login', getLoginApi());

	return router;
};

export { getApiController };
