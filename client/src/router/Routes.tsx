import { routes } from "./router.data";

import { Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { HomePage } from "../pages/HomePage";

import { NavigateToLoginPage } from "../pages/LoginPage";

import { useAuthStore } from "../store/auth";

export const AppRoutes = () => {
	const { accessToken } = useAuthStore();

	return (
		<Routes>
			{routes.map(({ path, Page, isPrivate }) => (
				<Route
					key={path}
					element={
						isPrivate ? (
							<PrivateRoute>
								<Page />
							</PrivateRoute>
						) : (
							<PublicRoute>
								<Page />
							</PublicRoute>
						)
					}
					path={path}
				/>
			))}
			<Route
				element={accessToken ? <HomePage /> : <NavigateToLoginPage />}
				path="*"
			/>
		</Routes>
	);
};
