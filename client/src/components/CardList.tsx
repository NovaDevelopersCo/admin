import {
	List,
	SearchInput,
	TextInput,
	TextField,
	TopToolbar,
	SelectColumnsButton,
	FilterButton,
	CreateButton,
	DatagridConfigurable
} from "react-admin";

const ListActions = () => {
	return (
		<TopToolbar>
			<SelectColumnsButton />
			<FilterButton />
			<CreateButton />
		</TopToolbar>
	);
};

const cardFilters = [
	<SearchInput source="q" alwaysOn />,
	<TextInput label="Title" source="title" defaultValue="Hello, World!" />
];

export const CardList = () => {
	return (
		<List resource="cards" actions={<ListActions />} filters={cardFilters}>
			<DatagridConfigurable>
				<TextField source="title" />
				<TextField source="description" />
				<TextField source="price" />
				<TextField source="count" />
			</DatagridConfigurable>
		</List>
	);
};
