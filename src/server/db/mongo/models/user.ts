import { model, Schema } from 'mongoose';

/* Schema
 * Es el contrato con el tipo de datos que tiene el documento en nuestra colección.
 * Son a nivel de aplicación para validar, NO son a nivel de BBDD.
 */
const UserSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	username: String,
	fullName: String,
	email: String,
	password: String,
	active: {
		type: Boolean,
		default: false
	},
	deleted: {
		type: Boolean,
		default: false
	},
	phone: String,
	gender: String
});

/* model
 * Permite crear instancias segun un schema determinado
 */

UserSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id;
		delete returnedObj._id;
		delete returnedObj.__v;
	}
});

const User = model('User', UserSchema);

export default User;
