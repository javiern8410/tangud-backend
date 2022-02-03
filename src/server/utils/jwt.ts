import jsonwebtoken from 'jsonwebtoken';

const generateDespegarJWT = (token, secret, app) => {
	const decoded = jsonwebtoken.decode(token);

	const allRolesPermissions = decoded.rc.filter((x) => (x.app = app)).flatMap((x) => x.per);

	const payload = {
		username: decoded.sub,
		exp: decoded.exp,
		permissions: [...(new Set(allRolesPermissions) as any)], // Remove duplicates
	};

	return jsonwebtoken.sign(payload, secret);
};

const decodeJWT = (token) => {
	return jsonwebtoken.decode(token);
};

const verifyJWT = (token, secret) => jsonwebtoken.verify(token, secret);

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

export default {
	generateDespegarJWT,
	decodeJWT,
	verifyJWT,
	checkJWT,
};
