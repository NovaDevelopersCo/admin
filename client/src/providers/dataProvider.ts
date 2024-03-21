import { DataProvider, withLifecycleCallbacks } from "react-admin";

import { Format } from "../utils";

import { $api } from "../api/http";

import qs from "qs";
import { AxiosError } from "axios";

const INVALID_RESOURCE_OPERATIONS = {
	create: ["categories", "orders"],
	delete: ["categories"],
	deleteMany: ["categories"]
};

// @ts-ignore. don't need to use updateMany / getManyReference
const provider: DataProvider = {
	getOne: async (res, par) => {
		try {
			const {
				data: { data }
			} = await $api.get(`/${res}/${par.id}`);
			return { data: Format.formatObjId(data) };
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return Promise.reject(err.response?.data.message ?? "something error");
		}
	},
	getMany: async (res, par) => {
		try {
			const query = {
				filter: JSON.stringify({ id: par.ids })
			};

			const url = `/${res}/many?${qs.stringify(query)}`;

			const {
				data: { data }
			} = await $api.get(url);

			const formatted = Format.formatObjId(data);

			return { data: [...(Array.isArray(formatted) ? formatted : [])] };
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return Promise.reject(err.response?.data.message ?? "something error");
		}
	},
	getList: async (res, par) => {
		try {
			const { page, perPage } = par.pagination;
			const { field, order } = par.sort;

			const query = {
				sort: JSON.stringify([field, order]),
				range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
				q: JSON.stringify(par.filter.q),
				filter: JSON.stringify(par.filter)
			};

			const url = `/${res}?${qs.stringify(query)}`;

			const {
				data: { data, total }
			} = await $api.get(url);

			const formatted = Format.formatObjId(data);

			return { data: [...(Array.isArray(formatted) ? formatted : [])], total };
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return Promise.reject(err.response?.data.message ?? "something error");
		}
	},
	create: async (res, par) => {
		if (INVALID_RESOURCE_OPERATIONS.create.includes(res)) {
			return Promise.reject("You can't create this resource");
		}

		try {
			const {
				data: { data }
			} = await $api.post(`/${res}`, { ...par.data });
			return { data: Format.formatObjId(data) };
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return Promise.reject(err.response?.data.message ?? "something error");
		}
	},
	update: async (res, par) => {
		try {
			const {
				data: { data }
			} = await $api.put(`/${res}/${par.id}`, {
				...par.data,
				previousData: par.previousData
			});
			return { data: Format.formatObjId(data) };
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return Promise.reject(err.response?.data.message ?? "something error");
		}
	},
	delete: async (res, par) => {
		if (INVALID_RESOURCE_OPERATIONS.delete.includes(res)) {
			return Promise.reject("You can't delete this resource");
		}
		try {
			const {
				data: { data }
			} = await $api.delete(`/${res}/${par.id}`);
			return { data: Format.formatObjId(data) };
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return Promise.reject(err.response?.data.message ?? "something error");
		}
	},
	deleteMany: async (res, par) => {
		if (INVALID_RESOURCE_OPERATIONS.deleteMany.includes(res)) {
			return Promise.reject("You can't delete this resources");
		}

		try {
			const url = `/${res}/many/${JSON.stringify(par.ids)}`;

			const {
				data: { ids }
			} = await $api.delete(url);

			return { data: Format.formatObjId(ids) };
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return Promise.reject(err.response?.data.message ?? "something error");
		}
	}
};

export const dataProvider = withLifecycleCallbacks(provider, [
	{
		resource: "categories",
		beforeUpdate: async (params, dataProvider: DataProvider) => {
			const { image, ...data } = params.data;

			if (image !== params.previousData.image) {
				data.image = await Format.convertToBase64(params.data.image);
			}

			return {
				...params,
				data
			};
		}
	}
]);
