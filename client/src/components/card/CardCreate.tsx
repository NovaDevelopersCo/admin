import {
	Create,
	ReferenceInput,
	SimpleForm,
	TextInput,
	maxLength,
	maxValue,
	minValue,
	number,
	required
} from "react-admin";

import { capitalizeString } from "../../utils";

import { useState } from "react";

import { CardCategorySelect } from "./CardCategorySelect";
import { isIntegerNumberValidation } from "../../utils";

export const CardCreate = () => {
	const [options, setOptions] = useState<string[]>([]);

	return (
		<Create>
			<SimpleForm>
				<TextInput
					source="name"
					validate={[required(), maxLength(50)]}
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
						validate={[maxLength(5), isIntegerNumberValidation]}
					/>
				))}
			</SimpleForm>
		</Create>
	);
};
