import { useRecordContext } from "react-admin";

import { classNames } from "../../utils";

import { Typography } from "../ui";

const { Text } = Typography;

export const CategoryOptions = ({ isShow }: { isShow: boolean }) => {
	const record = useRecordContext();

	return (
		<div className={classNames(isShow ? "mb-[10px]" : "mb-[30px]")}>
			<Text>Options:</Text>
			<ul className="flex gap-x-[10px]">
				{(record && record.options ? record.options : []).map((i: string) => (
					<li
						key={i}
						className="bg-optionItem px-[8px] py-[2px] rounded-[10px] text-[13px]"
					>
						{i}
					</li>
				))}
			</ul>
		</div>
	);
};
