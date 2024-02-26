export type TUser = {
	_id: string;
	login: string;
	password: string;
};

export type TSession = {
	_id: string;
	user: string;
	refreshToken: string;
};
