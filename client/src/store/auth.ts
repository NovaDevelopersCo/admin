import { create } from "zustand";

type TAuthStore = {
	accessToken: string;
	setAccessToken: (t: string) => void; // eslint-disable-line no-unused-vars
};

export const useAuthStore = create<TAuthStore>((set) => ({
	accessToken: "",
	setAccessToken: (accessToken) =>
		set(() => ({
			accessToken
		}))
}));
