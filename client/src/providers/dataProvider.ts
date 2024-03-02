import { DataProvider, fetchUtils, withLifecycleCallbacks } from "react-admin";

import { convertToBase64 } from "../utils/convertToBase64";
import { httpClientWithToken } from "../utils/httpClientWithToken";
import { formatObjId } from "../utils/formatObjId";

const httpClient = fetchUtils.fetchJson;

import qs from "qs";

const provider: DataProvider = {
	getOne: async (res, par) => {
		const { json } = await httpClient(
			`${import.meta.env.VITE_SIMPLE_REST_URL}/${res}/${par.id}`,
			{
				method: "GET"
			}
		);

		return { data: formatObjId(json.card) };
	},
	getMany: async (res, par) => {
		const query = {
			filter: JSON.stringify({ id: par.ids })
		};
		const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${res}?${qs.stringify(
			query
		)}`;

		const { json } = await httpClient(url, {
			method: "GET"
		});

		const formatted = formatObjId(json.cards);

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

		const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${res}?${qs.stringify(
			query
		)}`;

		const {
			json: { cards, total }
		} = await httpClient(url, {
			method: "GET"
		});

		const formatted = formatObjId(cards);

		return { data: [...(Array.isArray(formatted) ? formatted : [])], total };
	},
	create: async (res, par) => {
		const { json } = await httpClientWithToken(
			`${import.meta.env.VITE_SIMPLE_REST_URL}/${res}`,
			{
				method: "POST",
				body: JSON.stringify(par.data)
			}
		);

		return { data: formatObjId(json) };
	},
	update: async (res, par) => {
		const { json } = await httpClientWithToken(
			`${import.meta.env.VITE_SIMPLE_REST_URL}/${res}/${par.id}`,
			{
				method: "PUT",
				body: JSON.stringify(par.data)
			}
		);

		return { data: formatObjId(json.card) };
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
