import { Navigate, useNavigate } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";

import type { TAuthForm } from "../types/types";

import { AuthInput } from "../components/AuthInput";
import { AuthButton } from "../components/AuthButton";

import { login } from "../api/services/login";

export const LoginPage = () => {
	const options = useForm<TAuthForm>();

	const navigate = useNavigate();

	const { handleSubmit } = options;

	const onSubmit = (data: TAuthForm) => {
		login(data, navigate);
	};

	return (
		<FormProvider {...options}>
			<div className="h-[100dvh] flex items-center justify-center">
				<div className="w-full max-w-xs">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="bg-[#f5f3f5] shadow-md rounded px-8 pt-6 pb-8 mb-4"
					>
						<AuthInput type="text" name="Login" className="mb-4" />
						<AuthInput type="password" name="Password" className="mb-6" />
						<div className="flex gap-x-[25px] items-center">
							<AuthButton>Login</AuthButton>
							<AuthButton link="/registration">Registration</AuthButton>
						</div>
					</form>
				</div>
			</div>
		</FormProvider>
	);
};

export const NavigateToLoginPage = () => {
	return <Navigate to="/login" />;
};
