import {
	DatagridConfigurable,
	List,
	Pagination,
	TextField,
	SearchInput,
	SelectInput,
	DeleteButton,
	WrapperField
} from "react-admin";
import { Actions } from "../ui";

export const OrderList = () => {
	// useEffect(() => {
	// 	$api.post("/orders", {
	// 		body: JSON.stringify([{ count: "33", card: "65f978e5561c2441dfe4f9bc" }]),
	// 		name: "алеша столлпыыв",
	// 		email: "amail@gmail.com",
	// 		phone: "+71891119811"
	// 	});
	// }, []);

	return (
		<List
			resource="orders"
			actions={<Actions noCreate />}
			pagination={<Pagination />}
			filters={[
				<SearchInput source="q" alwaysOn />,
				<SelectInput
					source="status"
					choices={[
						{ id: "waiting", name: "Waiting" },
						{ id: "ready", name: "Ready" }
					]}
					alwaysOn
				/>
			]}
		>
			<DatagridConfigurable
				rowClick={(id, resource) => `/${resource}/${id}/show`}
			>
				<TextField source="number" />
				<TextField source="status" sortable={false} />
				<TextField source="name" />
				<TextField source="price" />
				<WrapperField label="Actions">
					<DeleteButton />
				</WrapperField>
			</DatagridConfigurable>
		</List>
	);
};
