import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

import type { FC } from "react";

type TRouteItem = {
	path: string;
	Page: FC;
	isPrivate: boolean;
};

export const routes: TRouteItem[] = [
	{
		path: "/login",
		Page: LoginPage,
		isPrivate: false
	},
	{
		path: "/registration",
		Page: RegistrationPage,
		isPrivate: false
	},
	{
		path: "/",
		Page: HomePage,
		isPrivate: true
	}
];
