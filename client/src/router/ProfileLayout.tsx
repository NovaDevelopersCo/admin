import { useState, useEffect } from "react";
import { refresh } from "../api/services/refresh";

import { Loader } from "../components/Loader";

import { Outlet } from "react-router-dom";

export const ProfileLayout = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isFetched, setIsFetched] = useState<boolean>(false);

	const loading = () => {
		setIsLoading(true);
		refresh(true).finally(() => {
			setIsLoading(false);
			setIsFetched(true);
		});
	};

	useEffect(() => {
		loading();
	}, []);

	return <>{isLoading || !isFetched ? <Loader /> : <Outlet />}</>;
};
