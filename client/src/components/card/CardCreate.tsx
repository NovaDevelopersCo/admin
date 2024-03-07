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

import { ImageChange } from "../ui";
import { CardCategorySelect } from "./CardCategorySelect";

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
				<TextInput source="description" label="Description" fullWidth />
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
				<ReferenceInput source="category" reference="categories">
					<CardCategorySelect setOptions={setOptions} />
				</ReferenceInput>
				<ImageChange validate={required()} source="image" label="Image" />
				{options.map((i) => (
					<TextInput
						source={i}
						label={capitalizeString(i)}
						key={i}
						fullWidth
						validate={[required(), maxLength(10)]}
					/>
				))}
			</SimpleForm>
		</Create>
	);
};
