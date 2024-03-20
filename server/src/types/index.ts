declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

export type TCard = {
	_id: string;
	price: string;
	name: string;
	count: string;
	diameter: string;
	length: string;
	width: string;
	thickness: string;
	size: string;
	orderCount: string;
	category: string;
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

export type TCategory = {
	_id: string;
	image: string;
	name: string;
	options: string[];
	description: string;
};

export type TOrderItem = {
	_id: string;
	count: string;
	card: string;
};

export type TOrder = {
	_id: string;
	description: string;
	email: string;
	phone: string;
	name: string;
	body: string[] | TOrderItem[];
	status: "ready" | "waiting";
	number: string;
	price: string;
};
