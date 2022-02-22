import express, { NextFunction, Request, Response, Router } from 'express';
import logger from 'loglevel';

import Company from '../../db/mongo/models/company';
import { listMap } from './companyMapper';

const find = async () => {
	const response = await Company.find({}).lean();

	return listMap(response);
};

const findById = async (id) => {
	const response = await Company.findById(id).lean();

	logger.info(response);

	return response;
};

const addCompany = async (company) => {
	const newCompany = new Company({
		owner: company.owner,
		companyName: company.companyName,
		slogan: company.slogan,
		logo: company.logo
	});

	let response;
	const checkIsExits = await Company.findOne({ companyName: company.companyName });

	if (checkIsExits) {
		response = {
			error: true,
			message: "This company name it's already in use"
		};
	} else {
		response = newCompany.save();
		logger.info(response);
	}

	return response;
};

const updateCompany = async (id, company) => {
	const newCompany = {
		owner: company.owner,
		companyName: company.companyName,
		slogan: company.slogan,
		logo: company.logo
	};

	// let response = await Company.findByIdAndUpdate({ companyName: company.companyName });

	const response = await Company.findByIdAndUpdate(id, newCompany, { new: true });

	logger.info(response);

	return response;
};
const getCompanyRoutes = (): Router => {
	const router = express.Router();

	router.post('/', (req: Request, res: Response, next: NextFunction) => {
		const company = req.body;

		const newCompany = new Company({
			owner: company.owner,
			companyName: company.companyName,
			slogan: company.slogan,
			logo: company.logo
		});

		Company.findOne({ companyName: company.companyName }).then((company) => {
			if (company) {
				res.status(302).send({
					error: "This company name it's already in use"
				});
			} else {
				newCompany
					.save()
					.then((result) => {
						logger.info(result);
						res.status(201).json(result);
					})
					.catch((err) => {
						logger.error(err);
						next(err);
					});
			}
		});
	});

	router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const company = req.body;

		const newCompany = {
			slogan: company.slogan,
			logo: company.logo
		};

		Company.findByIdAndUpdate(id, newCompany, { new: true })
			.then((result) => {
				logger.info(result);
				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.put('/:id/addAdmin', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const company = req.body;

		const newCompany = new Company({
			admins: [company.userId]
		});

		Company.findByIdAndUpdate(id, newCompany, { new: true })
			.then((result) => {
				logger.info(result);
				res.json(result);
			})
			.catch((err) => {
				next(err);
			});
	});

	router.put('/:id/addEditor', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { userId } = req.body;

		if (userId) {
			Company.findOne({ id: id })
				.then((company) => {
					if (company) {
						const { editors } = company;

						const newCompany = {
							editors: [...editors, userId]
						};

						Company.findByIdAndUpdate(id, newCompany, { new: true })
							.then((result) => {
								logger.info(result);
								res.json(result);
							})
							.catch((err) => {
								next(err);
							});
					} else {
						res.status(404).json('Company not found');
					}
				})
				.catch((err) => {
					next(err);
				});
		} else {
			res.status(200).json('Need a userId to complet this action');
		}
	});

	router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		Company.findByIdAndRemove(id)
			.then((result) => {
				logger.info(result);
				res.status(204).end();
			})
			.catch((err) => {
				next(err);
			});
	});

	return router;
};

export { addCompany, find, findById, updateCompany };
