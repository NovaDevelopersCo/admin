import { CategoryModel } from "../models/Category";
import { ApiError } from "../utils/ApiError";
import { ImageService } from "./ImageService";

export class CategoryService {
	static async getList(name: string, range: string, sort: string) {
		const [sortBy, sortOrder] = sort ? JSON.parse(sort) : [];
		const [filterStart, filterEnd] = range ? JSON.parse(range) : [];

		const q = name ? JSON.parse(name) : "";

		let items = await CategoryModel.find();
		let total;

		if (q) {
			items = items.filter((i) =>
				i.name.toLowerCase().includes(q.toLowerCase())
			);
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

		if (!total) {
			total = items.length;
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

		const parsedFilterObj = JSON.parse(filter);

		if (!parsedFilterObj.id) {
			return [];
		}

		const categories = await CategoryModel.find({
			_id: { $in: parsedFilterObj.id }
		});

		return categories;
	}
}
