import {
	ReferenceField,
	Show,
	SimpleShowLayout,
	TextField,
	useRecordContext,
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
	const record = useRecordContext();

	const { referenceRecord } = useReference({
		id: record?.category,
		reference: "categories"
	});

	return (
		<SimpleShowLayout>
			<TextField source="name" />
			<TextField source="description" />
			<TextField source="price" />
			<TextField source="count" />
			<ReferenceField source="category" reference="categories" link="show">
				<TextField source="name" />
			</ReferenceField>
			{!!referenceRecord &&
				!!referenceRecord.options &&
				referenceRecord.options.map((i: string) => (
					<TextField key={i} source={i} emptyText="н/д" />
				))}
		</SimpleShowLayout>
	);
};
