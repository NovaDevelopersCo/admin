import { classNames } from "../utils/classNames";

import type { ReactNode } from "react";

import { Link } from "react-router-dom";

export const AuthButton = ({
	children,
	className,
	link
}: {
	children: ReactNode;
	className?: string;
	link?: string;
}) => {
	const buttonClasses = classNames(
		"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
		className ?? ""
	);

	const linkClasses = classNames(
		"block py-2 px-4 hover:underline",
		className ?? ""
	);

	return link ? (
		<Link className={linkClasses} to={link}>
			{children}
		</Link>
	) : (
		<button className={buttonClasses} type="submit">
			{children}
		</button>
	);
};
