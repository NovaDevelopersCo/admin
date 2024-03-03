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
	logout: async () => {
		const logoutResult = await AuthService.logout();

		if (typeof logoutResult === "string" || !logoutResult) {
			return Promise.reject(logoutResult);
		}

		return Promise.resolve();
	},
	checkAuth: async () => {
		const { accessToken } = useAuthStore.getState();

		if (!accessToken) {
			console.log("refresh");
			const isAuth = await AuthService.refresh();

			if (!isAuth) {
				return Promise.reject("Please, reload the page");
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
