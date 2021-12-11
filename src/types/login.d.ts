interface ILoginPassword {
	password: string;
}

export interface ILoginForm extends ILoginPassword {
	username: string;
	newPassword?: string;
}

export interface ILoginChangePasswordForm extends ILoginPassword {
	confirmPassword: string;
}

export interface ILoginResponse {
	key: string;
	newUser: boolean;
}
