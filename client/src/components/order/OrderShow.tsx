import {
	ArrayField,
	Datagrid,
	Show,
	SimpleShowLayout,
	TextField,
	ReferenceField,
	useListContext
} from "react-admin";

import { PageTitle } from "../ui";

export const OrderShow = () => {
	return (
		<Show title={<PageTitle field="number" />}>
			<SimpleShowLayout>
				<TextField source="number" />
				<TextField source="status" />
				<TextField source="name" />
				<TextField source="email" />
				<TextField source="phone" />
				<TextField source="description" emptyText="-" />
				<TextField source="price" label="Total price" />
				<ArrayField source="body">
					<Datagrid bulkActionButtons={false}>
						<ReferenceField
							link="show"
							label="Name"
							source="card"
							reference="cards"
						>
							<TextField source="name" />
						</ReferenceField>
						<TextField source="count" />
					</Datagrid>
				</ArrayField>
			</SimpleShowLayout>
		</Show>
	);
};
