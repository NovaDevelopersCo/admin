import { Show, SimpleShowLayout, TextField, ImageField } from "react-admin";

export const CardShow = () => {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source="name" />
				<TextField source="description" />
				<TextField source="price" />
				<TextField source="count" />
				<ImageField source="image" className="max-w-[100px]" />
			</SimpleShowLayout>
		</Show>
	);
};
