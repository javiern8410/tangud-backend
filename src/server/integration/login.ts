import axios, { AxiosPromise } from 'axios';

import { ILoginForm } from '../../types/login';
import config from '../config';
import { baseClient } from './client';

const login = (form: ILoginForm): AxiosPromise => {
	const url = config.rest.integration['login'].url;

	return axios.post(url, form);
};

export { login };
