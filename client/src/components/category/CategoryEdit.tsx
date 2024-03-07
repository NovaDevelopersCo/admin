import { ImageChange, PageTitle } from "../ui";
import { Edit, SimpleForm, TextInput, maxLength, required } from "react-admin";

import { CategoryOptions } from "./CategoryOptions";

export const CategoryEdit = () => {
	return (
		<Edit title={<PageTitle />}>
			<SimpleForm>
				<TextInput
					source="name"
					fullWidth
					validate={[required(), maxLength(20)]}
				/>
				<TextInput source="description" fullWidth />
				<CategoryOptions isShow={false} />
				<ImageChange source="image" label="Image" validate={[required()]} />
			</SimpleForm>
		</Edit>
	);
};
