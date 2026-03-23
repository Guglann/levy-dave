import { useState } from "react";
import LazyImage from "./LazyImage";

type Props = {
	images: {
		url: string;
		alt: string;
	}[];
	className?: string;
};

export default function PhotoGallery(props: Props) {
	const [activeImage, setActiveImage] = useState(props.images[0]);

	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="w-full overflow-hidden rounded-md aspect-square">
				<LazyImage
					url={activeImage.url}
					alt={activeImage.alt}
					classNames={[
						"w-full",
						"h-full",
						"object-cover",
						"transition-opacity",
						"duration-300",
					]}
				/>
			</div>

			<div className="flex gap-2 overflow-y-hidden overflow-x-auto scrollbar-hide">
				{props.images.map((img) => (
					<button
						type={"button"}
						key={img.url}
						onClick={() => setActiveImage(img)}
						className={`relative shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all
              ${activeImage.url === img.url ? " scale-105" : "opacity-70 hover:opacity-100"}
            `}
					>
						<LazyImage
							url={img.url}
							alt={img.alt}
							classNames={["w-full", "h-full", "object-cover"]}
						/>
					</button>
				))}
			</div>
		</div>
	);
}
