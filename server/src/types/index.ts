declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

export type TCard = {
	_id: string;
	image: string;
	price: string;
	description: string;
	title: string;
	count: string;
};

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
