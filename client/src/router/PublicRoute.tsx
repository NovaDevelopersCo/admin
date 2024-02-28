import { useAuthStore } from "../store/auth";

import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
	const { accessToken } = useAuthStore();

	if (accessToken) {
		return <Navigate to={"/"} />;
	}

	return <>{children}</>;
};
