import {
	Edit,
	SimpleForm,
	TextInput,
	required,
	maxLength,
	number,
	minValue,
	maxValue
} from "react-admin";
import { PageTitle } from "../ui";

export const CardEdit = () => {
	return (
		<Edit title={<PageTitle />}>
			<SimpleForm>
				<TextInput
					source="name"
					validate={[required(), maxLength(50)]}
					fullWidth
				/>
				<TextInput
					source="price"
					validate={[number(), minValue(0), maxValue(9999)]}
					label="Price"
					fullWidth
				/>
				<TextInput
					source="count"
					label="Count"
					fullWidth
					validate={[number(), minValue(0), maxValue(999)]}
				/>
			</SimpleForm>
		</Edit>
	);
};
