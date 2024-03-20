import { useRecordContext } from "react-admin";

import { Format } from "../../utils";

export const PageTitle = ({ field }: { field?: string }) => {
	const record = useRecordContext();

	return (
		<>{record ? Format.formatTitle(field ? record[field] : record.name) : ""}</>
	);
};
