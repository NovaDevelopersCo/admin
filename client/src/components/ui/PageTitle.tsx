import { useRecordContext } from "react-admin";

import { Format } from "../../utils";

export const PageTitle = () => {
	const record = useRecordContext();

	return <>{record ? Format.formatTitle(record.name) : ""}</>;
};
