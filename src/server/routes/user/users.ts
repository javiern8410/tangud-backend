import bcrypt from 'bcrypt';
import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';

import { IUser } from '../../../types/user';
import User from '../../db/mongo/models/user';

const usersRoutes = (): Router => {
	const router = express.Router();

	router.get('/', (_: Request, res: Response, next: NextFunction) => {
		User.find({})
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		User.findById(id)
			.then((result) => {
				if (result) {
					res.json(result);
				} else {
					res.status(404).end();
				}
			})
			.catch((err) => {
				next(err);
			});
	});

	router.post('/', (req: Request, res: Response, next: NextFunction) => {
		const salt = bcrypt.genSaltSync(10);
		const user = req.body as IUser;

		const newUser = new User({
			username: user.username,
			email: user.email,
			password: bcrypt.hashSync(user.password, salt)
		});

		User.findOne({ username: user.username }).then((user) => {
			if (user) {
				res.status(302).send({
					error: "This usermane it's already in use"
				});
			} else {
				newUser
					.save()
					.then((result) => {
						logger.info(result);
						res.status(201).json(result);
					})
					.catch((err) => {
						logger.error(err);
						next(err);
					});
			}
		});
	});

	router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const user = req.body as IUser;

		const newUserData = {
			username: user.username,
			password: user.password,
			fullName: user.fullName,
			email: user.email,
			phone: user.phone,
			active: user.active,
			gender: user.gender
		};

		User.findByIdAndUpdate(id, newUserData, { new: true })
			.then((result) => {
				logger.info(result);
				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		User.findByIdAndRemove(id)
			.then((result) => {
				logger.info(result);
				res.status(204).end();
			})
			.catch((err) => {
				next(err);
			});
	});

	return router;
};

export { usersRoutes };
