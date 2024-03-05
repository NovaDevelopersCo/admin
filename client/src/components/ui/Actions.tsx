import { TopToolbar, SelectColumnsButton, CreateButton } from "react-admin";

export const Actions = () => {
	return (
		<TopToolbar>
			<SelectColumnsButton />
			<CreateButton />
		</TopToolbar>
	);
};
