import type { AuthProvider } from "react-admin";

import { AuthService } from "../api/AuthService";
import { useAuthStore } from "../store/auth";

export const authProvider: AuthProvider = {
	login: async (user) => {
		const errorMessage = await AuthService.login({
			...user,
			login: user.username
		});

		if (errorMessage) {
			return Promise.reject(errorMessage);
		}

		return Promise.resolve();
	},
	logout: async () => {},
	checkAuth: async () => {
		const { accessToken } = useAuthStore.getState();

		if (!accessToken) {
			const isAuth = await AuthService.refresh();

			if (!isAuth) {
				return Promise.reject({ message: false });
			}
		}

		return Promise.resolve();
	},
	getIdentity: async () => {
		const data = await AuthService.getProfile();

		if (typeof data === "string") {
			return Promise.reject(data);
		}

		return Promise.resolve({
			id: "user",
			fullName: data.login
		});
	},
	checkError: () => {
		return Promise.resolve();
	},
	getPermissions: () => {
		return Promise.resolve();
	}
};
