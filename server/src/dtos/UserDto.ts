import type { TUser } from "../types";

export class UserDto {
	public login: string;
	public _id: string;

	constructor(model: TUser) {
		this.login = model.login;
		this._id = model._id;
	}
}
