import { fetchUtils } from "react-admin";

import { useAuthStore } from "../store/auth";

export const httpClientWithToken = (
	url: string,
	options: fetchUtils.Options = {}
) => {
	const { accessToken } = useAuthStore.getState();

	const user = { token: `Bearer ${accessToken}`, authenticated: !!accessToken };

	return fetchUtils.fetchJson(url, { ...options, user });
};
