import { DataProvider, withLifecycleCallbacks } from "react-admin";

import { convertToBase64 } from "../utils/convertToBase64";
import { formatObjId } from "../utils/formatObjId";

import { $api } from "../api/http";

import qs from "qs";

// @ts-ignore. don't need to use updateMany / getManyReference
const provider: DataProvider = {
	getOne: async (res, par) => {
		const {
			data: { card }
		} = await $api.get(`/${res}/${par.id}`);
		return { data: formatObjId(card) };
	},
	getMany: async (res, par) => {
		const query = {
			filter: JSON.stringify({ id: par.ids })
		};
		const url = `/${res}?${qs.stringify(query)}`;

		const {
			data: { cards }
		} = await $api.get(url);

		const formatted = formatObjId(cards);

		return { data: [...(Array.isArray(formatted) ? formatted : [])] };
	},
	getList: async (res, par) => {
		const { page, perPage } = par.pagination;
		const { field, order } = par.sort;

		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			title: JSON.stringify(par.filter.q)
		};

		const url = `/${res}?${qs.stringify(query)}`;

		const {
			data: { cards, total }
		} = await $api.get(url);

		const formatted = formatObjId(cards);

		return { data: [...(Array.isArray(formatted) ? formatted : [])], total };
	},
	create: async (res, par) => {
		const { data } = await $api.post(`/${res}`, { ...par.data });
		return { data: formatObjId(data) };
	},
	update: async (res, par) => {
		const {
			data: { card }
		} = await $api.put(`/${res}/${par.id}`, { ...par.data });
		return { data: formatObjId(card) };
	},
	delete: async (res, par) => {
		const {
			data: { card }
		} = await $api.delete(`/${res}/${par.id}`);
		return { data: formatObjId(card) };
	},
	deleteMany: async (res, par) => {
		const url = `/${res}/many/${JSON.stringify(par.ids)}`;

		const {
			data: { ids }
		} = await $api.delete(url);

		return { data: formatObjId(ids) };
	}
};

export const dataProvider = withLifecycleCallbacks(provider, [
	{
		resource: "cards",
		beforeCreate: async (params, dataProvider: DataProvider) => {
			const image = await convertToBase64(params.data.image);

			return {
				...params,
				data: {
					...params.data,
					image
				}
			};
		},
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
