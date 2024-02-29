export type TAuthForm = {
	login: string;
	password: string;
};

export type TUser = {
	_id: string;
	login: string;
};

export type TCard = {
	_id: string;
	image: string;
	price: number;
	description: string;
	title: string;
	count: number;
};
