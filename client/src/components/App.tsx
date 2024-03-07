import { Admin, Resource, TitlePortal } from "react-admin";
import { dataProvider, authProvider } from "../providers";
import { CardList, CardCreate, CardShow, CardEdit } from "./card";
import { LogoutButton } from "./ui";
import { UserMenu, AppBar, Layout } from "react-admin";
import { CategoryList, CategoryEdit, CategoryShow } from "./category";

const MyUserMenu = () => (
	<UserMenu>
		<LogoutButton />
	</UserMenu>
);

const MyAppBar = () => (
	<AppBar userMenu={<MyUserMenu />}>
		<TitlePortal />
	</AppBar>
);

const MyLayout = (props: any) => {
	return <Layout {...props} appBar={MyAppBar} />;
};

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
			<Resource
				name="categories"
				show={CategoryShow}
				list={CategoryList}
				edit={CategoryEdit}
			/>
		</Admin>
	);
};
