import express, { Router } from 'express';
import logger from 'loglevel';

import { getCompanyRoutes } from '../../routes/company/companies';
import { getLoginApi } from '../../routes/login/login';
import { postsRoutes } from '../../routes/post/posts';
import { usersRoutes } from '../../routes/user/users';

const getApiController = (): Router => {
	const router = express.Router();

	router.use('/', baseRoute());
	router.use('/users', usersRoutes());
	router.use('/posts', postsRoutes());
	router.use('/login', getLoginApi());
	router.use('/companies', getCompanyRoutes());

	return router;
};

export { getApiController };

const baseRoute = (): Router => {
	const router = express.Router();

	router.get('/', async (req, res) => {
		try {
			res.json({
				status: 'OK',
				system: 'TANGUD'
			});
		} catch (e) {
			logger.error(e);
			res.status(e.response.status).send(e);
		}
	});

	return router;
};
