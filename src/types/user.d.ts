export interface IUser {
	id: string;
	created: Date;
	username: string;
	fullName: string;
	email: string;
	password: string;
	phone: string;
	gender: string;
	active: boolean;
	delete: boolean;
}
