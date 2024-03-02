import {
	List,
	SearchInput,
	TextField,
	TopToolbar,
	SelectColumnsButton,
	CreateButton,
	DatagridConfigurable,
	ImageField,
	EditButton,
	ShowButton,
	WrapperField
} from "react-admin";

const ListActions = () => {
	return (
		<TopToolbar>
			<SelectColumnsButton />
			<CreateButton />
		</TopToolbar>
	);
};

const cardFilters = [<SearchInput source="q" alwaysOn />];

export const CardList = () => {
	return (
		<List resource="cards" actions={<ListActions />} filters={cardFilters}>
			<DatagridConfigurable>
				<TextField source="title" />
				<TextField source="description" />
				<TextField source="price" />
				<TextField source="count" />
				<ImageField source="image" className="max-w-[100px] " />
				<WrapperField label="Actions">
					<EditButton />
					<ShowButton />
				</WrapperField>
			</DatagridConfigurable>
		</List>
	);
};
