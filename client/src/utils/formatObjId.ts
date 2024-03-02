const format = (elem: any) => {
	const { _id, ...data } = elem;
	return { ...data, id: _id };
};

export const formatObjId = (elem: any) =>
	Array.isArray(elem) ? elem.map((i) => format(i)) : format(elem);
