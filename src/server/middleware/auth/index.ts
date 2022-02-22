import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from './../../config';

const authMiddleware = express.Router();

authMiddleware.use((req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['auth-token'];

	if (token) {
		jwt.verify(token, config.sensitive['api.key'], (err, decoded) => {
			if (err) {
				return res.json({ mensaje: 'Token inválida' });
			} else {
				req.headers.decoded = decoded;
				next();
			}
		});
	} else {
		res.send({
			mensaje: 'Token not send'
		});
	}
});

export default authMiddleware;
