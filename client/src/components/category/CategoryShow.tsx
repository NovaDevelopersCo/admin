import { ImageField, SimpleShowLayout, TextField, Show } from "react-admin";
import { CategoryOptions } from "./CategoryOptions";
import { PageTitle } from "../ui";

export const CategoryShow = () => {
	return (
		<Show title={<PageTitle />}>
			<SimpleShowLayout>
				<TextField source="name" />
				<TextField source="description" />
				<CategoryOptions isShow />
				<ImageField source="image" className="max-w-[100px]" />
			</SimpleShowLayout>
		</Show>
	);
};
