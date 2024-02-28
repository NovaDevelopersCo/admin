import {
	Admin,
	Resource,
	ListGuesser,
	EditGuesser,
	ShowGuesser
} from "react-admin";
import { dataProvider } from "../dataProvider";
import { useProfileStore } from "../store/profile";

export const HomePage = () => {
	const { user } = useProfileStore();

	console.log(user);

	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="Card"
				list={ListGuesser}
				edit={EditGuesser}
				show={ShowGuesser}
			/>
		</Admin>
	);
};
