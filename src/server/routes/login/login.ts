import bcrypt from 'bcrypt';
import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';

import User from '../../db/mongo/models/user';
import { generateJWT } from '../../utils/jwt';

const getLoginApi = (): Router => {
	const router = express.Router();

	router.post('/', (req: Request, res: Response, next: NextFunction) => {
		const data = req.body;

		User.findOne({ username: data.username })
			.then((result) => {
				if (!result) {
					res.status(400).send({ error: 'Incorrect Username or password' });
				}
				const validPassword = bcrypt.compareSync(data.password, result.password);

				logger.info(result);
				if (!validPassword) {
					res.status(400).send({ error: 'Incorrect Username or password' });
				} else {
					const token = generateJWT({ username: result.username, id: result.id });

					res.header('auth-token', token).json({
						login: 'OK',
						error: null
					});
				}
			})
			.catch((err) => {
				logger.error(err);
				next(err);
			});
	});

	return router;
};

export { getLoginApi };
