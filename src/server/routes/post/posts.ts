import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';

import Post from '../../db/mongo/models/post';
import User from '../../db/mongo/models/user';

const postsRoutes = (): Router => {
	const router = express.Router();

	router.get('/', (_: Request, res: Response, next: NextFunction) => {
		Post.find({})
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		Post.findById(id)
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
		const post = req.body;

		const newPost = new Post({
			userId: post.userId,
			title: post.title,
			body: post.body,
			images: post.images
		});

		newPost
			.save()
			.then((result) => {
				logger.info(result);
				res.status(201).json(result);
			})
			.catch((err) => {
				logger.error(err);
				next(err);
			});
	});

	router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const post = req.body;

		const newPostData = {
			userId: post.userId,
			title: post.title,
			body: post.body,
			images: post.images
		};

		Post.findByIdAndUpdate(id, newPostData, { new: true })
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

		Post.findByIdAndRemove(id)
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

export { postsRoutes };
