import { Admin, Resource } from "react-admin";
import { dataProvider } from "../providers/dataProvider";
import { authProvider } from "../providers/authProvider";

import { CardList } from "./CardList";

export const App = () => {
	return (
		<Admin dataProvider={dataProvider} authProvider={authProvider}>
			<Resource name="Card" list={CardList} />
		</Admin>
	);
};
