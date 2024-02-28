import axios from "axios";

import { refresh } from "./services/refresh";

import { useAuthStore } from "../store/auth";

const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_SIMPLE_REST_URL
});

$api.interceptors.request.use((req) => {
	const { accessToken } = useAuthStore.getState();

	if (accessToken) {
		req.headers.authorization = `Bearer ${accessToken}`;
	}

	return req;
});

$api.interceptors.response.use(
	(req) => req,
	async (e) => {
		const origin = e.config;

		if (e.response && e.response?.status === 401 && !e._isRetry) {
			e._isRetry = true;

			const isRefresh = await refresh();

			if (isRefresh) {
				return $api(origin);
			}

			window.location.replace("/login");
		}

		throw e;
	}
);

export { $api };
