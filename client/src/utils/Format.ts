export class Format {
	constructor() {}

	static formatDescription(str: string) {
		let formattedStr = str.slice(0, 150);

		if (str.length > 150) {
			formattedStr += "...";
		}

		return formattedStr;
	}

	static formatObjId(elem: any) {
		const format = (elem: any) => {
			const { _id, ...data } = elem;
			return { ...data, id: _id };
		};

		return Array.isArray(elem) ? elem.map((i) => format(i)) : format(elem);
	}

	static formatTitle(title: string) {
		let formattedTitle = title.slice(0, 25);

		if (title.length > 25) {
			formattedTitle += "...";
		}

		return formattedTitle;
	}

	static getMegabyteSize(size: number, isString: boolean) {
		let res: string = String(size / 1000000);

		if (isString) {
			res += "mb";
		}

		return res;
	}

	static capitalizeString(str: string) {
		if (str.length === 0) {
			return str;
		}

		const firstLetter = str.charAt(0).toUpperCase();
		const partOfString = str.slice(1);

		return firstLetter + partOfString;
	}

	static convertToBase64(file: {
		rawFile: File;
	}): Promise<null | string | ArrayBuffer> {
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
	}
}
