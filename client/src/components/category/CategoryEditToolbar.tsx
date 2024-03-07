import { Toolbar } from "react-admin";

import { SaveButton } from "react-admin";

export const CategoryEditToolbar = () => {
	return (
		<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
			<SaveButton />
		</Toolbar>
	);
};
