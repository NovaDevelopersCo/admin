import { ImageInput, ImageField, type ImageInputProps } from "react-admin";
import { getMegabyteSize } from "../../utils";
import { useFormContext } from "react-hook-form";

import { useState } from "react";

const DEFAULT_SIZE = 3000000;

export const ImageChange = (props: ImageInputProps) => {
	const { source, maxSize } = props;

	const [image, setImage] = useState<File | null>();

	const { resetField } = useFormContext();

	return (
		<>
			<ImageInput
				{...props}
				accept="image/png,image/jpg,image/jpeg,image/webp"
				maxSize={maxSize ?? DEFAULT_SIZE}
				onChange={(e) => {
					if (!e) {
						alert(
							`Only jpg, jpeg, png, webp. Max size ${getMegabyteSize(
								maxSize ?? DEFAULT_SIZE,
								true
							)}`
						);
						if (source) {
							resetField(source);
						}
					}
					setImage(e);
				}}
			>
				{image && (
					<ImageField className="max-w-[100px]" source="src" title="preview" />
				)}
			</ImageInput>
			<p className="text-[13px] -mt-[5px] text-[#979797] font-bold">
				Max size {getMegabyteSize(maxSize ?? DEFAULT_SIZE, true)}. Only jpeg,
				jpg, png, webp
			</p>
			{!image && <ImageField className="max-w-[100px]" source="image" />}
		</>
	);
};
