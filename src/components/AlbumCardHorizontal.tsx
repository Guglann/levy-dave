import type { Album, Translations } from "../types";
import Button from "./Button";

type Props = {
	album: Album;
	languageIso: string;
	translations: Translations;
};

export default function AlbumCardHorizontal(props: Props) {
	return (
		<div className={"grid grid-cols-1 sm:grid-cols-6"}>
			<div className={"col-span-2"}>
				<img
					src={props.album.coverSource}
					alt={props.album.title}
					className="max-h-full max-w-full object-contain rounded-lg"
				/>
			</div>
			<div className={"col-span-4 py-6 sm:px-12"}>
				<div className={"text-2xl mb-4 font-semibold"}>{props.album.title}</div>
				<div
					className="text-lg font-light mb-7"
					dangerouslySetInnerHTML={{
						__html: props.album.description[props.languageIso],
					}}
				/>

				<Button
					text={props.translations.seeAlbum[props.languageIso]}
					size={"medium"}
					variant={"primary"}
					extraClasses={["shadow-md"]}
					color={"brand"}
					to={`/${props.languageIso}/album/${props.album.id}`}
				/>
			</div>
		</div>
	);
}
