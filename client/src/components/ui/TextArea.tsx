import { classNames } from "../../utils";
import { Typography } from "./Typography";

import { useInput } from "react-admin";

const { Text } = Typography;

export const TextArea = ({
	source,
	className
}: {
	source: string;
	className?: string;
}) => {
	const { id, field, fieldState } = useInput({ source });

	const textAreaClasses = classNames("w-full", className ?? "");

	return (
		<div className={textAreaClasses}>
			<Text>Description:</Text>
			<textarea
				id={id}
				{...field}
				className="bg-[#f5f5f5] resize-none w-full h-[250px] mb-[30px] p-[10px] "
			></textarea>
			{fieldState.error && <span>{fieldState.error.message}</span>}
		</div>
	);
};
