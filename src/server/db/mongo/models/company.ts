import { model, Schema } from 'mongoose';

/* Schema
 * Es el contrato con el tipo de datos que tiene el documento en nuestra colección.
 * Son a nivel de aplicación para validar, NO son a nivel de BBDD.
 */
const CompanySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	owner: {
		type: String,
		required: true,
		immutable: true
	},
	companyName: {
		type: String,
		required: true,
		immutable: true
	},
	slogan: String,
	logo: String,
	active: {
		type: Boolean,
		default: true
	},
	admins: [],
	editors: []
});

/* model
 * Permite crear instancias segun un schema determinado
 */

CompanySchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id;
		delete returnedObj._id;
		delete returnedObj.__v;
	}
});

const Company = model('Company', CompanySchema);

export default Company;
