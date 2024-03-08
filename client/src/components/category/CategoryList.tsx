import {
	List,
	DatagridConfigurable,
	TextField,
	ImageField,
	WrapperField,
	EditButton,
	ShowButton
} from "react-admin";

import { Actions, Filters, Pagination, Description } from "../ui";

export const CategoryList = () => {
	return (
		<List
			resource="categories"
			actions={<Actions noCreate />}
			filters={Filters}
			pagination={<Pagination />}
		>
			<DatagridConfigurable
				rowClick={(id, resource) => `/${resource}/${id}/show`}
			>
				<TextField source="name" />
				<ImageField className="max-w-[100px]" source="image" sortable={false} />
				<Description sortable={false} source="description" />
				<WrapperField label="Actions">
					<EditButton />
				</WrapperField>
			</DatagridConfigurable>
		</List>
	);
};
