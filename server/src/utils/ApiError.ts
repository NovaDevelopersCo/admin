export class ApiError extends Error {
	constructor(
		public status: number,
		public text: string
	) {
		super(text);
	}

	public static unauthorized() {
		return new ApiError(401, "You unauthorized");
	}

	public static badRequest(text: string) {
		return new ApiError(400, text);
	}
}
