import { Request, Response } from 'express';
import logger from 'loglevel';

const notFound = (req: Request, res: Response): void => {
	logger.info(req.originalUrl);
	res.status(404).end();
};

export default notFound;
