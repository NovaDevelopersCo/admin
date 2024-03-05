import { Pagination } from "react-admin";

export const CustomPagination = () => (
	<div className="flex items-center justify-between">
		<h3 className="p-[3px] pl-[15px] text-[13px] font-bold opacity-40">
			NovaDev Template
		</h3>
		<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
	</div>
);
