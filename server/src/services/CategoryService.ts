import { CategoryModel } from "../models/Category";
import { ApiError } from "../utils/ApiError";
import { ImageService } from "./ImageService";

export class CategoryService {
	static async getList(name: string, range: string, sort: string) {
		const [sortBy, sortOrder] = JSON.parse(sort) as ["name", "ASC" | "DESC"];
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

		if (filterStart && filterEnd) {
			items = items.slice(+filterStart, +filterEnd + 1);
		}

		return { items, total: total ?? items.length };
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
			description?: string;
			image?: string;
		},
		id: string
	) {
		const category = await CategoryModel.findById(id);

		if (!category) {
			throw ApiError.badRequest("Category not found");
		}

		if (description) {
			category.description = description;
		}

		if (image) {
			const imageUrl = await ImageService.upload(image, category._id);
			category.image = imageUrl;
		}

		await category.save();

		return category;
	}
}
