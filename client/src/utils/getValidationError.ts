// error format: @@react-admin@@{"message":"error","args":{"max":200}}

export const getValidationError = (str?: string) => {
	return str ? JSON.parse(str?.split("@@react-admin@@")[1]) : {};
};
