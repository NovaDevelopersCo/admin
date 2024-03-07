import { useRecordContext } from "react-admin";

import { formatTitle } from "../../utils";

export const PageTitle = () => {
	const record = useRecordContext();
	return <>{record ? formatTitle(record.name) : ""}</>;
};
