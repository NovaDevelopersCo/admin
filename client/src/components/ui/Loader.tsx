import LoaderImage from "../assets/loader.svg";

export const Loader = () => {
	return (
		<div className="min-h-[100dvh] flex justify-center items-center">
			<img
				className="w-[60px] animate-auth-loader"
				alt="loader"
				src={LoaderImage}
			/>
		</div>
	);
};
