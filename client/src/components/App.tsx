import { Admin, Resource } from "react-admin";
import { dataProvider } from "../providers/dataProvider";
import { authProvider } from "../providers/authProvider";

import { CardList } from "./CardList";
import { CardCreate } from "./CardCreate";

export const App = () => {
	return (
		<Admin dataProvider={dataProvider} authProvider={authProvider} title="Alco">
			<Resource name="cards" list={CardList} create={CardCreate} />
		</Admin>
	);
};
