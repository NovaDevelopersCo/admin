import {
	Admin,
	Resource,
	TitlePortal,
	UserMenu,
	AppBar,
	Layout
} from "react-admin";
import { dataProvider, authProvider } from "../providers";
import { CardList, CardCreate, CardShow, CardEdit } from "./card";
import { CategoryList, CategoryEdit, CategoryShow } from "./category";
import { OrderList } from "./order";
import { LogoutButton } from "./ui";
import { QueryClient } from "react-query";

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
	return (
		<>
			<Layout {...props} appBar={MyAppBar} />
		</>
	);
};

export const App = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				keepPreviousData: true
			}
		}
	});

	return (
		<Admin
			layout={MyLayout}
			dataProvider={dataProvider}
			authProvider={authProvider}
			title="Alco"
			requireAuth
			queryClient={queryClient}
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
			<Resource name="Orders" list={OrderList} />
		</Admin>
	);
};
