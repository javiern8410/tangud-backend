import jwt from 'jsonwebtoken';

import config from './../config';

const maxAge = 3 * 24 * 60 * 60;

const generateJWT = (data) => {
	const payload = {
		username: data.username,
		id: data.id
	};

	return jwt.sign(payload, config.sensitive['api.key'], {
		expiresIn: maxAge
	});
};

const createToken = (id, secret) => {
	return jwt.sign({ id }, secret, {
		expiresIn: maxAge
	});
};

const decodeJWT = (token) => {
	return jwt.decode(token);
};

const verifyJWT = (token, secret) => jwt.verify(token, secret);

const checkJWT = (req, res, next, options = {} as any) => {
	const cookie = req.cookies[options.cookieName];
	const secret = options.secret;
	const redirectUrl = options.redirectUrl;

	if (!cookie) {
		res.redirect(redirectUrl);
	} else {
		try {
			const decoded = verifyJWT(cookie, secret);

			req.jwt = cookie;
			req.decoded_jwt = decoded;
			next();
		} catch (e) {
			res.redirect(redirectUrl);
		}
	}
};

export { checkJWT, createToken, decodeJWT, generateJWT, verifyJWT };
