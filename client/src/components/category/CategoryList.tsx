import {
	List,
	DatagridConfigurable,
	TextField,
	ImageField,
	WrapperField,
	EditButton,
	ShowButton
} from "react-admin";

import { Actions, Filters, Pagination } from "../ui";

export const CategoryList = () => {
	return (
		<List
			resource="categories"
			actions={<Actions noCreate />}
			filters={Filters}
			pagination={<Pagination />}
		>
			<DatagridConfigurable>
				<TextField source="name" />
				<TextField source="description" />
				<ImageField className="max-w-[100px]" source="image" />
				<WrapperField label="Actions">
					<EditButton />
					<ShowButton />
				</WrapperField>
			</DatagridConfigurable>
		</List>
	);
};
