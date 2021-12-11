import { NextFunction, Request, Response } from 'express';
import logger from 'loglevel';

interface Error {
	message: string;
	stack: string;
}

const errorMiddleware = (error: Error, _: Request, res: Response, next: NextFunction): void => {
	if (res.headersSent) {
		next(error);
	} else {
		logger.error(error);
		res.status(500);
		res.json({
			message: error.message,
			...(process.env.NODE_ENV === 'production' ? null : { stack: error.stack })
		});
	}
};

export default errorMiddleware;
