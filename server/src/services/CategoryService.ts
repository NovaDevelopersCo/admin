import { CategoryModel } from "../models/Category";
import { ApiError } from "../utils/ApiError";
import { ImageService } from "./ImageService";

export class CategoryService {
	static async getList(name: string, range: string, sort: string) {
		let parsedSort: string[] = [];
		let parsedFilter: string[] = [];
		let q = "";

		try {
			if (sort) {
				parsedSort = JSON.parse(sort);
			}

			if (range) {
				parsedFilter = JSON.parse(range);
			}
			if (name) {
				q = JSON.parse(name);
			}
		} catch (e) {
			throw ApiError.badRequest("Can't parse query params");
		}

		const [sortBy, sortOrder] = parsedSort;
		const [filterStart, filterEnd] = parsedFilter;

		let items = await CategoryModel.find();
		let total;

		if (q) {
			items = items.filter((i) =>
				i.name.toLowerCase().includes(q.toLowerCase())
			);
			total = items.length;
		}

		if (!total) {
			total = items.length;
		}

		if (sortBy === "name") {
			if (sortOrder === "ASC") {
				items = [...items].sort((a, b) => a.name.localeCompare(b.name));
			}

			if (sortOrder === "DESC") {
				items = [...items].sort((b, a) => a.name.localeCompare(b.name));
			}
		}

		if (Number.isInteger(+filterStart) && Number.isInteger(+filterEnd)) {
			items = items.slice(+filterStart, +filterEnd + 1);
		}

		return { items, total };
	}

	static async getOne(id: string) {
		const category = await CategoryModel.findById(id);

		if (!category) {
			throw ApiError.badRequest("Category not found");
		}

		return category;
	}

	static async update(
		{
			description,
			image
		}: {
			description: string;
			image?: string;
		},
		id: string
	) {
		const category = await CategoryModel.findById(id);

		if (!category) {
			throw ApiError.badRequest("Category not found");
		}

		category.description = description;

		if (image) {
			const imageUrl = await ImageService.upload(
				image,
				category._id,
				"categories"
			);
			category.image = imageUrl;
		}

		await category.save();

		return category;
	}

	static async getMany(filter: string) {
		if (!filter) {
			return [];
		}

		let parsedFilterObj;

		try {
			parsedFilterObj = JSON.parse(filter);
		} catch (e) {
			throw ApiError.badRequest("Can't parse query params");
		}

		if (!parsedFilterObj.id) {
			return [];
		}

		const categories = await CategoryModel.find({
			_id: { $in: parsedFilterObj.id }
		});

		return categories;
	}
}
