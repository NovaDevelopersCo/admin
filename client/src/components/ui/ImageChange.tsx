import { ImageInput, ImageField, type ImageInputProps } from "react-admin";

import { useState } from "react";

export const ImageChange = (props: ImageInputProps) => {
	const [image, setImage] = useState<File | null>();

	return (
		<>
			<ImageInput
				{...props}
				accept="image/png,image/jpg,image/jpeg,image/webp"
				maxSize={3000000}
				onChange={(e) => {
					if (!e) {
						alert("Only jpg, jpeg, png, webp. Max size 3mb");
					}
					setImage(e);
				}}
			>
				{image && (
					<ImageField className="max-w-[100px]" source="src" title="preview" />
				)}
			</ImageInput>
			{!image && <ImageField className="max-w-[100px]" source="image" />}
		</>
	);
};
