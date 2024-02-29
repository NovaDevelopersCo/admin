import { DataProvider, fetchUtils } from "react-admin";

import { formatResource } from "../utils/formatResource";

const httpClient = fetchUtils.fetchJson;

import qs from "qs";

export const dataProvider: DataProvider = {
	getOne: async (res, par) => {
		const { json } = await httpClient(
			`${import.meta.env.VITE_SIMPLE_REST_URL}/${formatResource(res)}/${
				par.id
			}`,
			{
				method: "GET"
			}
		);
		return { data: json };
	},
	getMany: async (res, par) => {
		const query = {
			filter: JSON.stringify({ id: par.ids })
		};
		const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${formatResource(
			res
		)}?${qs.stringify(query)}`;

		const { json } = await httpClient(url, {
			method: "GET"
		});

		return { data: [...json.card] };
	},
	getList: async (res, par) => {
		const { page, perPage } = par.pagination;
		const { field, order } = par.sort;

		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify(par.filter)
		};

		const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${formatResource(
			res
		)}?${qs.stringify(query)}`;

		const {
			json: { cards, total }
		} = await httpClient(url, {
			method: "GET"
		});

		return { data: [...cards], total };
	}
};
