import express, { Router } from 'express';
import logger from 'loglevel';

import { login } from '../../integration/login';

const getLoginApi = (): Router => {
	const router = express.Router();

	router.post('/', async (req, res) => {
		try {
			const response: any = (await login(req.body)).data;
			res.json(response);
		} catch (e) {
			logger.error(e);
			res.status(e.response.status).send(e);
		}
	});

	return router;
};

export { getLoginApi };
