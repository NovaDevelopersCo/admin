import { TopToolbar, SelectColumnsButton, CreateButton } from "react-admin";

export const Actions = ({ noCreate }: { noCreate?: boolean }) => {
	return (
		<TopToolbar>
			<SelectColumnsButton />
			{!noCreate && <CreateButton />}
		</TopToolbar>
	);
};
