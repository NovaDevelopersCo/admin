import { AuthService } from "../api/AuthService";

export const logout = async () => {
	const logoutResult = await AuthService.logout();

	if (typeof logoutResult === "string" || !logoutResult) {
		alert(logoutResult || "logout error");
	}

	window.location.href = "/login";
};
