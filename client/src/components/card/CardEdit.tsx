import {
	Edit,
	SimpleForm,
	TextInput,
	required,
	maxLength,
	number,
	minValue,
	maxValue,
	ImageInput
} from "react-admin";

export const CardEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput
					source="title"
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
				<ImageInput
					validate={required()}
					source="image"
					label="Image"
					fullWidth
				/>
			</SimpleForm>
		</Edit>
	);
};
