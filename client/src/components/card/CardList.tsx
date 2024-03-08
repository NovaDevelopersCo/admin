import {
	List,
	TextField,
	DatagridConfigurable,
	ImageField,
	EditButton,
	ShowButton,
	WrapperField
} from "react-admin";

import { Pagination, Filters, Actions } from "../ui";

export const CardList = () => {
	return (
		<List
			resource="cards"
			actions={<Actions />}
			filters={Filters}
			pagination={<Pagination />}
		>
			<DatagridConfigurable>
				<TextField source="name" sortable />
				<TextField source="description" />
				<TextField source="price" sortable />
				<TextField source="count" />
				<ImageField source="image" className="max-w-[100px]" />
				<WrapperField label="Actions">
					<EditButton />
					<ShowButton />
				</WrapperField>
			</DatagridConfigurable>
		</List>
	);
};
