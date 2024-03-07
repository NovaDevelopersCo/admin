import { SelectInput, required, useChoicesContext } from "react-admin";

export const CardCategorySelect = ({
	setOptions
}: {
	setOptions: (c: string[]) => void;
}) => {
	const { allChoices } = useChoicesContext();

	const getOptions = (o: string) => {
		const category = allChoices.find((i) => i.id === o);
		setOptions(category && category.options ? category.options : []);
	};

	return (
		<SelectInput
			fullWidth
			optionText="name"
			validate={required()}
			optionValue="id"
			onChange={(e) => getOptions(e.target.value)}
		/>
	);
};
