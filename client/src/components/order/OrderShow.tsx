import { Show, SimpleShowLayout, TextField } from "react-admin";

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
				{/* ADD BODY */}
			</SimpleShowLayout>
		</Show>
	);
};
