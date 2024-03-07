import { ImageInput, ImageField, type ImageInputProps } from "react-admin";

import { useState } from "react";

export const ImageChange = (props: ImageInputProps) => {
	const [image, setImage] = useState<File | null>();

	return (
		<>
			<ImageInput {...props} maxSize={10000000} onChange={(e) => setImage(e)}>
				{image && (
					<ImageField className="max-w-[100px]" source="src" title="preview" />
				)}
			</ImageInput>
			{!image && <ImageField className="max-w-[100px]" source="image" />}
		</>
	);
};
