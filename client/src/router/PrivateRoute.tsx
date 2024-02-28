import { useAuthStore } from "../store/auth";

import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const { accessToken } = useAuthStore();

	if (!accessToken) {
		return <Navigate to={"/login"} />;
	}

	return <>{children}</>;
};
