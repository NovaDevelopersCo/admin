import { Create, ImageInput, SimpleForm, TextInput } from "react-admin";

export const CardCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="title" fullWidth />
				<TextInput source="description" fullWidth />
				<TextInput source="price" fullWidth />
				<TextInput source="count" fullWidth />
				<ImageInput source="image" />
			</SimpleForm>
		</Create>
	);
};
