import { Admin, Resource } from "react-admin";
import { dataProvider } from "../providers/dataProvider";
import { authProvider } from "../providers/authProvider";

import { CardList } from "./card/CardList";
import { CardCreate } from "./card/CardCreate";
import { CardShow } from "./card/CardShow";
import { CardEdit } from "./card/CardEdit";
import { LogoutButton } from "./ui/LogoutButton";
import { UserMenu } from "react-admin";
import { AppBar } from "react-admin";
import { Layout } from "react-admin";

const MyUserMenu = () => (
	<UserMenu>
		<LogoutButton />
	</UserMenu>
);

const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

export const App = () => {
	return (
		<Admin
			layout={MyLayout}
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
