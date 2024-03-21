import { useRecordContext } from "react-admin";

import { Format } from "../../utils";

export const Description = ({
	source
}: {
	source: string;
	sortable?: boolean;
}) => {
	const record = useRecordContext({ source });

	return record && record[source] ? (
		<p>{Format.formatDescription(record[source])}</p>
	) : null;
};
