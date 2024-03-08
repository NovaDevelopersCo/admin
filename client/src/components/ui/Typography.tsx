import type { ReactNode } from "react";
import { classNames } from "../../utils";

const Title = ({
	children,
	variant,
	className
}: {
	variant: "h4";
	children: ReactNode;
	className?: string;
}) => {
	const titleClassNames = classNames("", className ?? "");

	switch (variant) {
		case "h4":
			return <h4 className={titleClassNames}>{children}</h4>;
	}
};

const Text = ({
	children,
	className
}: {
	children: ReactNode;
	className?: string;
}) => {
	const textClassNames = classNames(
		"text-[0.75em] text-inputTitle mb-[10px]",
		className ?? ""
	);

	return <p className={textClassNames}>{children}</p>;
};

export const Typography = {
	Title,
	Text
};
