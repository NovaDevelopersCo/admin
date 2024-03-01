type TModel = {
	_id: string;
};

export const formatObjWithId = (arr: TModel[]) =>
	arr.map((i) => {
		const { _id, ...data } = i;
		return { ...data, id: _id };
	});
