import express, { Router } from 'express';
import logger from 'loglevel';


const baseRoute = (): Router => {
	const router = express.Router();

	router.get('/', async (req, res) => {
		try {
			res.json({
				status: "OK",
				system: "TANGUD"
			});
		} catch (e) {
			logger.error(e);
			res.status(e.response.status).send(e);
		}
	});

	return router;
};

export { baseRoute };
