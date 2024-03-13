import {
	Create,
	ReferenceInput,
	SimpleForm,
	TextInput,
	maxLength,
	maxValue,
	minValue,
	number,
	regex,
	required
} from "react-admin";

import { capitalizeString, isIntegerNumberValidation } from "../../utils";

import { useState } from "react";

import { CardCategorySelect } from "./CardCategorySelect";

export const CardCreate = () => {
	const [options, setOptions] = useState<string[]>([]);

	return (
		<Create redirect="list">
			<SimpleForm>
				<TextInput
					source="name"
					validate={[
						required(),
						maxLength(50),
						regex(
							/^[a-zA-Z0-9*()\- а-яА-Я]+$/u,
							"Incorrect format. Specific symbols error"
						)
					]}
					fullWidth
				/>
				<TextInput
					source="price"
					validate={[
						number(),
						minValue(0),
						maxValue(9999),
						required(),
						isIntegerNumberValidation
					]}
					label="Price"
					fullWidth
				/>
				<TextInput
					source="count"
					label="Count"
					fullWidth
					validate={[
						number(),
						minValue(0),
						maxValue(999),
						isIntegerNumberValidation
					]}
				/>
				<ReferenceInput source="category" reference="categories">
					<CardCategorySelect setOptions={setOptions} />
				</ReferenceInput>
				{options.map((i) => (
					<TextInput
						source={i}
						label={capitalizeString(i)}
						key={i}
						fullWidth
						validate={[maxLength(5)]}
					/>
				))}
			</SimpleForm>
		</Create>
	);
};
