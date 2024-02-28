import { AuthInput } from "../components/AuthInput";
import { AuthButton } from "../components/AuthButton";

import { useForm, FormProvider } from "react-hook-form";

import type { TAuthForm } from "../types/types";
import { registration } from "../api/services/registration";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
	const options = useForm<TAuthForm>();

	const navigate = useNavigate();

	const { handleSubmit } = options;

	const onSubmit = (data: TAuthForm) => {
		registration(data, navigate);
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
							<AuthButton>Registration</AuthButton>
							<AuthButton link="/login">Login</AuthButton>
						</div>
					</form>
				</div>
			</div>
		</FormProvider>
	);
};
