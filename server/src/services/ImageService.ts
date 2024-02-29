import { UploadApiErrorResponse, v2 as cloudinary } from "cloudinary";
import { ApiError } from "../utils/ApiError";

export class ImageService {
	static async upload(image: string, cardName: string) {
		try {
			const res = await cloudinary.uploader.upload(image, {
				public_id: cardName,
				folder: "alco/cards"
			});

			return res.secure_url;
		} catch (e) {
			const err = e as UploadApiErrorResponse;
			throw ApiError.badRequest(err.message);
		}
	}

	static async remove(cardName: string) {
		try {
			const res = await cloudinary.uploader.destroy(cardName);

			return res;
		} catch (e) {
			throw ApiError.badRequest("Error delete image");
		}
	}
}
