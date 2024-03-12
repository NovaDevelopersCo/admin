import {
	Edit,
	SimpleForm,
	TextInput,
	required,
	maxLength,
	number,
	minValue,
	maxValue,
	regex,
	type ValidateForm
} from "react-admin";

import type { FieldValues } from "react-hook-form";

import { PageTitle } from "../ui";

export const CardEdit = () => {
	return (
		<Edit title={<PageTitle />}>
			<SimpleForm>
				<TextInput
					source="name"
					validate={[
						required(),
						maxLength(50),
						regex(
							/^[a-zA-Z0-9*()\- ]+$/,
							"Incorrect format. Specific symbols error"
						)
					]}
					fullWidth
				/>
				<TextInput
					source="price"
					validate={[number(), minValue(0), maxValue(9999)]}
					label="Price"
					fullWidth
				/>
				<TextInput
					source="count"
					label="Count"
					fullWidth
					validate={[number(), minValue(0), maxValue(999)]}
				/>
			</SimpleForm>
		</Edit>
	);
};
