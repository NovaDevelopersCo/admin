import { Show, SimpleShowLayout, TextField } from "react-admin";

export const CardShow = () => {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField source="name" />
				<TextField source="description" />
				<TextField source="price" />
				<TextField source="count" />
			</SimpleShowLayout>
		</Show>
	);
};
