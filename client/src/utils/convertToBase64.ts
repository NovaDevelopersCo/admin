export const convertToBase64 = (file: {
	rawFile: File;
}): Promise<null | string | ArrayBuffer> => {
	return new Promise((res, rej) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file.rawFile);

		fileReader.onload = () => {
			res(fileReader.result);
		};

		fileReader.onerror = (err) => {
			rej(err);
		};
	});
};
