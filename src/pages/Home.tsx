import { useParams } from "react-router-dom";
import AlbumCardHorizontal from "../components/AlbumCardHorizontal";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import type { PageData, RouteParams } from "../types";
import { getStringTranslation } from "../utils/translationUtil";

type Props = {
	pageData: PageData;
};

export default function Home(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	return (
		<>
			<PageSectionHeader
				title={getStringTranslation(
					props.pageData.translations,
					"shop",
					languageIso,
				)}
			/>

			<PageSectionNarrow>
				<div className={"grid grid-cols-1 gap-3 sm:gap-10"}>
					{props.pageData.config.albums.map((album) => (
						<AlbumCardHorizontal
							translations={props.pageData.translations}
							key={album.id}
							album={album}
							languageIso={languageIso}
						/>
					))}
				</div>
			</PageSectionNarrow>
		</>
	);
}
