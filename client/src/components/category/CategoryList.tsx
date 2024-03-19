import {
	List,
	DatagridConfigurable,
	TextField,
	ImageField,
	WrapperField,
	EditButton,
	SearchInput
} from "react-admin";

import { Actions, Pagination, Description } from "../ui";

export const CategoryList = () => {
	return (
		<List
			resource="categories"
			actions={<Actions noCreate />}
			filters={[<SearchInput source="q" alwaysOn />]}
			pagination={<Pagination />}
		>
			<DatagridConfigurable
				rowClick={(id, resource) => `/${resource}/${id}/show`}
				bulkActionButtons={false}
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
