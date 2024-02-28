import axios from "axios";

import { useAuthStore } from "../../store/auth";
import { useProfileStore } from "../../store/profile";

import type { TUser } from "../../types/types";

export const refresh = async (isFirstLoad: boolean = false) => {
	try {
		const { data } = await axios.post<{ accessToken: string; user: TUser }>(
			`${import.meta.env.VITE_SIMPLE_REST_URL}/auth/refresh`,
			{},
			{
				withCredentials: true
			}
		);

		useAuthStore.getState().setAccessToken(data.accessToken);

		if (isFirstLoad) {
			useProfileStore.getState().setUser(data.user);
		}

		return true;
	} catch (e) {
		return false;
	}
};
