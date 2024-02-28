import { $api } from "../http";

import type { TAuthForm } from "../../types/types";
import type { AxiosError } from "axios";

import { useAuthStore } from "../../store/auth";

import type { NavigateFunction } from "react-router-dom";

export const registration = async (
	user: TAuthForm,
	navigate: NavigateFunction
) => {
	try {
		const { data } = await $api.post<{ accessToken: string }>(
			"/auth/registration",
			{ ...user }
		);
		useAuthStore.getState().setAccessToken(data.accessToken);
		navigate("/");
	} catch (e) {
		const err = e as AxiosError<{ message: string }>;
		alert(err.response?.data.message || "something error");
	}
};
