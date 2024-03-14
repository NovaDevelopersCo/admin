import { classNames, Validation } from "../../utils";
import { Typography } from "./Typography";

import { useInput, type InputProps } from "react-admin";

const { Text } = Typography;

export const TextArea = (
	props: InputProps & {
		className?: string;
	}
) => {
	const {
		id,
		field,
		fieldState: { error }
	} = useInput({
		...props
	});

	const textAreaClasses = classNames("w-full mb-[25px]", props.className ?? "");

	return (
		<div className={textAreaClasses}>
			<Text>Description:</Text>
			<textarea
				id={id}
				{...field}
				className="bg-[#f5f5f5] resize-none w-full h-[250px] p-[10px] "
			/>
			{!!error && (
				<p className="text-[#d32f2f] ml-[5px] text-[12px]">
					{Validation.getReactAdminValidationError(error.message)?.message}
				</p>
			)}
		</div>
	);
};
