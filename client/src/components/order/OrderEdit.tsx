import {
	Edit,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	ArrayField,
	Datagrid,
	ReferenceField,
	required
} from "react-admin";

export const OrderEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="number" fullWidth disabled />
				<SelectInput
					fullWidth
					source="status"
					optionText="status"
					defaultValue="waiting"
					choices={[
						{ id: "ready", status: "ready" },
						{ id: "waiting", status: "waiting", disabled: true }
					]}
					validate={[required()]}
				/>
				<ArrayField source="body">
					<Datagrid className="w-full" bulkActionButtons={false}>
						<ReferenceField
							link="show"
							source="card"
							label="Name"
							reference="cards"
						>
							<TextField source="name" />
						</ReferenceField>
						<TextField source="count" />
					</Datagrid>
				</ArrayField>
			</SimpleForm>
		</Edit>
	);
};
