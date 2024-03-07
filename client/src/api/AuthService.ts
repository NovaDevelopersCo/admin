import { $api } from "./http";

import axios, { type AxiosError } from "axios";

import { useAuthStore } from "../store";

import type { TAuthForm, TUser } from "../types/types";

export class AuthService {
	static async login(user: TAuthForm) {
		try {
			const { data } = await $api.post<{ accessToken: string }>("/auth/login", {
				...user
			});
			useAuthStore.getState().setAccessToken(data.accessToken);
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return err.response?.data.message || "something error";
		}
	}

	static async refresh() {
		try {
			const { data } = await axios.post<{ accessToken: string }>(
				`${import.meta.env.VITE_SIMPLE_REST_URL}/auth/refresh`,
				{},
				{
					withCredentials: true
				}
			);

			useAuthStore.getState().setAccessToken(data.accessToken);

			return true;
		} catch (e) {
			return false;
		}
	}

	static async logout() {
		try {
			const { data } = await $api.post<{ message: boolean }>("/auth/logout");

			return data.message;
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return err.response?.data.message || "something error";
		}
	}

	static async getProfile() {
		try {
			const { data } = await $api.get<TUser>("/auth/profile");
			return data;
		} catch (e) {
			const err = e as AxiosError<{ message: string }>;
			return err.response?.data.message || "something error";
		}
	}
}
