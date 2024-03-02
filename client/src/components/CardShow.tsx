import { Show, SimpleShowLayout, TextField, ImageField } from "react-admin";

export const CardShow = () => {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source="title" />
				<TextField source="description" />
				<TextField source="price" />
				<TextField source="count" />
				<ImageField source="image" />
			</SimpleShowLayout>
		</Show>
	);
};
