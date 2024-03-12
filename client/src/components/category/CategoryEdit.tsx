import { ImageChange, PageTitle, TextArea } from "../ui";
import { Edit, SimpleForm, maxLength, required } from "react-admin";

import { EditToolbar } from "../ui";

import { CategoryOptions } from "./CategoryOptions";

export const CategoryEdit = () => {
	return (
		<Edit title={<PageTitle />}>
			<SimpleForm toolbar={<EditToolbar />}>
				<TextArea
					source="description"
					validate={[maxLength(3000, "Max length 3000 symbols")]}
				/>
				<CategoryOptions isShow={false} />
				<ImageChange source="image" label="Image" validate={[required()]} />
			</SimpleForm>
		</Edit>
	);
};
