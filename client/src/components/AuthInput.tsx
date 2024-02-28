import { useId } from "react";
import { useFormContext } from "react-hook-form";

import type { TAuthForm } from "../types/types";

export const AuthInput = ({
	name,
	type,
	className
}: {
	name: string;
	type: "text" | "password";
	className: string;
}) => {
	const inputName = type === "password" ? "password" : "login";

	const inputId = useId();

	const {
		register,
		formState: { errors }
	} = useFormContext<TAuthForm>();

	const errorList = errors[inputName];

	const loginValidation = {
		minLength: { value: 5, message: "Login can't be smaller, than 5 symbols" },
		maxLength: { value: 10, message: "Login can't be longer, than 10 symbols" }
	};

	const passwordValidation = {
		minLength: {
			value: 8,
			message: "Password can't be smaller, than 8 symbols"
		},
		maxLength: {
			value: 16,
			message: "Password can't be longer, than 16 symbols"
		}
	};

	return (
		<div className={className}>
			<label
				className="block text-gray-700 text-sm font-bold mb-2"
				htmlFor={inputId}
			>
				{name}
			</label>
			<input
				required
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id={inputId}
				placeholder={name}
				type={type}
				{...register(
					type === "password" ? "password" : "login",
					type === "password" ? passwordValidation : loginValidation
				)}
			/>
			{errorList && (
				<p className="text-red-500 text-xs italic mt-[5px] pl-[5px]">
					{errorList.message}
				</p>
			)}
		</div>
	);
};
