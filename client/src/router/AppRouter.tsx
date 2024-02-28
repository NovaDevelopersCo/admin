import { Routes, Route } from "react-router-dom";

import { ProfileLayout } from "./ProfileLayout";

import { AppRoutes } from "./Routes";

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<ProfileLayout />}>
				<Route path="*" element={<AppRoutes />} />
			</Route>
		</Routes>
	);
};
