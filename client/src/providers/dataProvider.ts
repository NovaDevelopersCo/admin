import { DataProvider, withLifecycleCallbacks } from "react-admin";

import { convertToBase64, formatObjId } from "../utils";

import { $api } from "../api/http";

import qs from "qs";

const INVALID_RESOURCE_OPERATIONS = {
	create: ["categories"],
	delete: ["categories"],
	deleteMany: ["categories"]
};

// @ts-ignore. don't need to use updateMany / getManyReference
const provider: DataProvider = {
	getOne: async (res, par) => {
		const {
			data: { data }
		} = await $api.get(`/${res}/${par.id}`);
		return { data: formatObjId(data) };
	},
	getMany: async (res, par) => {
		const query = {
			filter: JSON.stringify({ id: par.ids })
		};
		const url = `/${res}?${qs.stringify(query)}`;

		const {
			data: { data }
		} = await $api.get(url);

		const formatted = formatObjId(data);

		return { data: [...(Array.isArray(formatted) ? formatted : [])] };
	},
	getList: async (res, par) => {
		const { page, perPage } = par.pagination;
		const { field, order } = par.sort;

		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			q: JSON.stringify(par.filter.q)
		};

		const url = `/${res}?${qs.stringify(query)}`;

		const {
			data: { data, total }
		} = await $api.get(url);

		const formatted = formatObjId(data);

		return { data: [...(Array.isArray(formatted) ? formatted : [])], total };
	},
	create: async (res, par) => {
		if (!INVALID_RESOURCE_OPERATIONS.create.includes(res)) {
			const {
				data: { data }
			} = await $api.post(`/${res}`, { ...par.data });
			return { data: formatObjId(data) };
		}

		return Promise.reject("You can't create this resource");
	},
	update: async (res, par) => {
		const {
			data: { data }
		} = await $api.put(`/${res}/${par.id}`, { ...par.data });
		return { data: formatObjId(data) };
	},
	delete: async (res, par) => {
		if (!INVALID_RESOURCE_OPERATIONS.delete.includes(res)) {
			const {
				data: { data }
			} = await $api.delete(`/${res}/${par.id}`);
			return { data: formatObjId(data) };
		}

		return Promise.reject("You can't delete this resource");
	},
	deleteMany: async (res, par) => {
		if (!INVALID_RESOURCE_OPERATIONS.deleteMany.includes(res)) {
			const url = `/${res}/many/${JSON.stringify(par.ids)}`;

			const {
				data: { ids }
			} = await $api.delete(url);

			return { data: formatObjId(ids) };
		}

		return Promise.reject("You can't delete this resources");
	}
};

export const dataProvider = withLifecycleCallbacks(provider, [
	{
		resource: "categories",
		beforeUpdate: async (params, dataProvider: DataProvider) => {
			const { image, ...data } = params.data;

			if (image !== params.previousData.image) {
				data.image = await convertToBase64(params.data.image);
			}

			return {
				...params,
				data
			};
		}
	}
]);
