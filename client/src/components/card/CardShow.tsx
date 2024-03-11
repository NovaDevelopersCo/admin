import {
	ReferenceField,
	Show,
	SimpleShowLayout,
	TextField,
	useReference
} from "react-admin";

import { PageTitle } from "../ui";

export const CardShow = () => {
	return (
		<Show title={<PageTitle />}>
			<CardShowBody />
		</Show>
	);
};

const CardShowBody = () => {
	return (
		<SimpleShowLayout>
			<TextField source="name" />
			<TextField source="description" />
			<TextField source="price" />
			<TextField source="count" />
			<ReferenceField source="category" reference="categories">
				<TextField source="name" />
			</ReferenceField>
		</SimpleShowLayout>
	);
};
