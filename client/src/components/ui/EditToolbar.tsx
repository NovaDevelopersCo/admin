import { Toolbar } from "react-admin";

import { SaveButton, EditButton } from "react-admin";

export const EditToolbar = ({ isEdit }: { isEdit?: boolean }) => {
	return (
		<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
			<SaveButton type="button" alwaysEnable />
			{isEdit && <EditButton />}
		</Toolbar>
	);
};
