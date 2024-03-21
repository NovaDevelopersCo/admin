import type { TCard, TCategory } from "../types";

export class CardDto {
	public _id: string;
	public price: string;
	public name: string;
	public count: string;
	public diameter: string;
	public length: string;
	public width: string;
	public thickness: string;
	public size: string;
	public category: string;
	public stamp: string;
	public view: string;
	public wall: string;
	public color: string;
	public profile: string;
	public type: string;
	public fluting: string;
	public wallHeight: string;
	public shelf: string;
	public coverage: string;
	constructor(model: TCard & { category: TCategory | string }, full?: string) {
		this._id = model._id;
		this.price = model.price;
		this.name = model.name;
		this.count = model.count;
		this.diameter = model.diameter;
		this.length = model.length;
		this.width = model.width;
		this.thickness = model.thickness;
		this.size = model.size;
		this.stamp = model.stamp;
		this.view = model.view;
		this.wall = model.wall;
		this.color = model.color;
		this.profile = model.profile;
		this.type = model.type;
		this.fluting = model.fluting;
		this.wallHeight = model.wallHeight;
		this.shelf = model.shelf;
		this.coverage = model.coverage;
		this.category =
			typeof model.category === "object" && !full
				? // @ts-ignore
					model.category._id
				: model.category;
	}
}
