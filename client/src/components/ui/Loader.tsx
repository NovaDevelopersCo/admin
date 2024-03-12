import LoaderImage from "../../assets/loader.svg";
import { classNames } from "../../utils";

export const Loader = ({ className }: { className?: string }) => {
	const loaderClassName = classNames("", className ?? "");

	return (
		<div className={loaderClassName}>
			<img
				className="w-[60px] animate-auth-loader"
				alt="loader"
				src={LoaderImage}
			/>
		</div>
	);
};
