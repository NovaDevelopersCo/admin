import {
	List,
	TextField,
	DatagridConfigurable,
	ImageField,
	EditButton,
	ShowButton,
	WrapperField
} from "react-admin";

import { CustomPagination } from "../ui/Pagination";
import { Filters } from "../ui/Filters";
import { Actions } from "../ui/Actions";

export const CardList = () => {
	return (
		<>
			<List
				resource="cards"
				actions={<Actions />}
				filters={Filters}
				pagination={<CustomPagination />}
			>
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
		</>
	);
};
