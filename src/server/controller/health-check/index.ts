import express, { Router } from 'express';

import packageJson from '../../../../package.json';

const getHealthCheck = (): Router => {
	const router = express.Router();

	router.get('/', (_, res) => res.status(200).json({ status: 'OK', version: packageJson.version }));

	return router;
};

export { getHealthCheck };
