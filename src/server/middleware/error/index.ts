import { NextFunction, Request, Response } from 'express';
import logger from 'loglevel';

interface Error {
	name: string;
	message: string;
	stack: string;
}

const errorMiddleware = (error: Error, _: Request, res: Response, next: NextFunction): void => {
	if (res.headersSent) {
		next(error);
	} else {
		logger.error(error);
		if (error.name === 'CastError') {
			res.status(400).send({ message: 'id used is malformed' });
		}

		res.status(500).json({
			message: error.message,
			...(process.env.NODE_ENV === 'production' ? null : { stack: error.stack })
		});
	}
};

export default errorMiddleware;
