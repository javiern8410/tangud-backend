import express, { NextFunction, Request, Response, Router } from 'express';

import { addCompany, find, findById, updateCompany } from './companiesService';

const getCompanyRoutes = (): Router => {
	const router = express.Router();

	router.get('/', async (_: Request, res: Response, next: NextFunction) => {
		try {
			const result = await find();

			res.json(result);
		} catch (err) {
			next(err);
		}
	});

	router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		try {
			const result = await findById(id);

			if (result) {
				res.json(result);
			} else {
				res.status(404).end();
			}
		} catch (err) {
			next(err);
		}
	});

	router.post('/', async (req, res, next) => {
		const company = req.body;

		try {
			const response = await addCompany(company);

			if (response?.error) {
				res.status(302).send({
					error: response?.message
				});
			} else {
				res.status(201).json(response);
			}
			if (!response) {
				throw new Error('Request failed, try again');
			}
		} catch (err) {
			next(err);
		}
	});

	router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const company = req.body;

		try {
			const response = await updateCompany(id, company);

			if (!response) {
				throw new Error(`Failed to update company whit id: ${id}`);
			}
			res.send(response);
		} catch (err) {
			next(err);
		}
	});

	/*

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

	*/

	return router;
};

export { getCompanyRoutes };
