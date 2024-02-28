import { create } from "zustand";

import type { TUser } from "../types/types";

type TProfileStore = {
	user: TUser | null;
	setUser: (user: TUser | null) => void; // eslint-disable-line no-unused-vars
};

export const useProfileStore = create<TProfileStore>((set) => ({
	user: null,
	setUser: (user) =>
		set(() => ({
			user
		}))
}));
