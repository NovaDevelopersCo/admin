import {
	Edit,
	SimpleForm,
	TextInput,
	required,
	maxLength,
	number,
	minValue,
	maxValue,
	regex,
	ReferenceInput,
	useRecordContext,
	useReference
} from "react-admin";

import { CardCategorySelect } from "./CardCategorySelect";

import { Loader, PageTitle } from "../ui";
import { useEffect, useState } from "react";
import { isIntegerNumberValidation, capitalizeString } from "../../utils";

export const CardEdit = () => {
	return (
		<Edit title={<PageTitle />}>
			<CardEditBody />
		</Edit>
	);
};

const CardEditBody = () => {
	const [options, setOptions] = useState<string[]>([]);

	const record = useRecordContext();
	const { referenceRecord, isLoading, isFetching } = useReference({
		id: record.category,
		reference: "categories"
	});

	useEffect(() => {
		setOptions(referenceRecord?.options ?? []);
	}, [referenceRecord]);

	return (
		<SimpleForm>
			{isLoading ? (
				<Loader className="justify-center items-center h-full w-full flex py-[20px]" />
			) : (
				<></>
			)}
			<TextInput
				source="name"
				validate={[
					required(),
					maxLength(50),
					regex(
						/^[a-zA-Z0-9*()\- ]+$/,
						"Incorrect format. Specific symbols error"
					)
				]}
				fullWidth
			/>
			<TextInput
				source="price"
				validate={[
					number(),
					minValue(0),
					maxValue(9999),
					required(),
					isIntegerNumberValidation
				]}
				label="Price"
				fullWidth
			/>
			<TextInput
				source="count"
				label="Count"
				fullWidth
				validate={[
					number(),
					minValue(0),
					maxValue(999),
					isIntegerNumberValidation
				]}
			/>
			<ReferenceInput source="category" reference="categories">
				<CardCategorySelect setOptions={setOptions} />
			</ReferenceInput>
			{isLoading ? (
				<Loader />
			) : (
				options.map((i) => (
					<TextInput
						source={i}
						label={capitalizeString(i)}
						key={i}
						fullWidth
						validate={[maxLength(5)]}
					/>
				))
			)}
		</SimpleForm>
	);
};
