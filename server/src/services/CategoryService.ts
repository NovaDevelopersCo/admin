import { CategoryModel } from "../models/Category";
import { ApiError } from "../utils/ApiError";

export class CategoryService {
	static async getList() {
		const categories = await CategoryModel.find();
		return categories;
	}

	static async getOne(id: string) {
		const category = await CategoryModel.findById(id);

		if (!category) {
			throw ApiError.badRequest("Category not found");
		}

		return category;
	}
}
