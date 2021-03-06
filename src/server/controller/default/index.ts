import express, { Request, Response, Router } from 'express';

import config from '../../config';

const getDefaultController = (): Router => {
	const router = express.Router();

	router.get(config['views-context'], defaultView);

	return router;
};

const defaultView = async (_: Request, res: Response) => {
	const model = {
		base: '/tangud',
		title: 'tangud-home',
		content: '<h2>Info generated by Faker</h2>'
	};

	res.render('index', model);
};

export { getDefaultController };
