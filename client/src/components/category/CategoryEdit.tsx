import { ImageChange, PageTitle, TextArea } from "../ui";
import { Edit, SimpleForm, required } from "react-admin";

import { EditToolbar } from "../ui";

import { CategoryOptions } from "./CategoryOptions";

export const CategoryEdit = () => {
	return (
		<Edit title={<PageTitle />}>
			<SimpleForm toolbar={<EditToolbar />}>
				<TextArea source="description" />
				<CategoryOptions isShow={false} />
				<ImageChange source="image" label="Image" validate={[required()]} />
			</SimpleForm>
		</Edit>
	);
};
