import { List, Datagrid, TextField } from "react-admin";
import { useParams } from "react-router-dom";

export const CardList = () => {
	const id = useParams();

	return (
		<List resource="card">
			<Datagrid rowClick="edit">
				<TextField source="id" />
				<TextField source="title" />
				<TextField source="price" />
				<TextField source="description" />
			</Datagrid>
		</List>
	);
};
