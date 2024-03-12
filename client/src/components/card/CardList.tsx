import {
	List,
	TextField,
	DatagridConfigurable,
	ReferenceField,
	EditButton,
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
			<DatagridConfigurable
				rowClick={(id, resource) => `/${resource}/${id}/show`}
			>
				<TextField source="name" sortable />
				<TextField source="price" sortable />
				<TextField source="count" />
				<ReferenceField
					source="category"
					reference="categories"
					sortable={false}
				>
					<TextField source="name" />
				</ReferenceField>
				<TextField source="orderCount" />
				<WrapperField label="Actions">
					<EditButton />
				</WrapperField>
			</DatagridConfigurable>
		</List>
	);
};
