import { Admin, Resource } from "react-admin";
import { dataProvider } from "../providers/dataProvider";
import { authProvider } from "../providers/authProvider";

import { CardList } from "./CardList";
import { CardCreate } from "./CardCreate";
import { CardShow } from "./CardShow";
import { CardEdit } from "./CardEdit";

export const App = () => {
	return (
		<Admin
			dataProvider={dataProvider}
			authProvider={authProvider}
			title="Alco"
			requireAuth
		>
			<Resource
				name="cards"
				list={CardList}
				create={CardCreate}
				show={CardShow}
				edit={CardEdit}
			/>
		</Admin>
	);
};
