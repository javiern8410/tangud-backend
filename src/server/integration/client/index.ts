const AxiosClient = require('@despegar/ff-node-axios-client');
import { AxiosInstance } from 'axios';

import config from '../../config';

export const baseClient = (url: string, includeHeaders = true): AxiosInstance => {
	return AxiosClient.create({
		url: url,
		timeout: 360000,
		xClient: config.rest['x-client'],
		includeHeaders,
		headersKey: 'despHeaders'
	});
};
