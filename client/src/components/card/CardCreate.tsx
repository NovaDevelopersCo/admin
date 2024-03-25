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

import { Format, Validation } from "../../utils";

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
							/^[a-zA-Z0-9*()\-.,/ а-яА-Я]+$/u,
							"Incorrect format. Specific symbols error"
						),
						Validation.isStrNotOnlySpace
					]}
					fullWidth
				/>
				<TextInput
					source="price"
					validate={[
						number(),
						minValue(0),
						maxValue(999999),
						required(),
						regex(/^\S*$/, "Can't use spaces here"),
						regex(/^\d+$/, "Only integer number, not as: (4.0 or 5.1)")
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
						regex(/^\S*$/, "Can't use spaces here"),
						regex(/^\d+$/, "Only integer number, not as: (4.0 or 5.1)")
					]}
				/>
				<ReferenceInput source="category" reference="categories">
					<CardCategorySelect setOptions={setOptions} />
				</ReferenceInput>
				{options.map((i) => (
					<TextInput
						source={i}
						label={Format.capitalizeString(i)}
						key={i}
						fullWidth
						validate={[maxLength(20)]}
					/>
				))}
			</SimpleForm>
		</Create>
	);
};
