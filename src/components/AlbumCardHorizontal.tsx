import type { LocalizedAlbum } from "../types";
import {
	getAssetUrl,
	getHtmlString,
	getTranslationValue,
} from "../utils/contentfulValueUtil";
import Button from "./Button";
import LazyImage from "./LazyImage";

type Props = {
	album: LocalizedAlbum;
	languageIso: string;
	seeButtonText: string;
};

export default function AlbumCardHorizontal(props: Props) {
	return (
		<div className={"grid grid-cols-1 sm:grid-cols-6"}>
			<div className={"col-span-2"}>
				<LazyImage
					url={getAssetUrl(props.album.fields.cover)}
					alt={"AlbumProductData cover"}
					classNames={[
						"max-h-full",
						"max-w-full",
						"object-contain",
						"rounded-lg",
					]}
				/>
			</div>
			<div className={"col-span-4 py-6 sm:px-12"}>
				<div className={"text-2xl mb-4 font-semibold"}>
					{getTranslationValue(props.album.fields.title, "pl")}
				</div>
				<div
					className="text-lg font-light mb-7"
					dangerouslySetInnerHTML={{
						__html: getHtmlString(
							props.album.fields.description,
							props.languageIso,
						),
					}}
				/>

				<Button
					text={props.seeButtonText}
					size={"medium"}
					variant={"primary"}
					extraClasses={["shadow-md"]}
					color={"brand"}
					to={`/${props.languageIso}/album/${getTranslationValue(props.album.fields.id, "pl")}`}
				/>
			</div>
		</div>
	);
}
