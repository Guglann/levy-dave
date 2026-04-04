import { useParams } from "react-router-dom";
import AlbumCardHorizontal from "../components/AlbumCardHorizontal";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import type { PageData, RouteParams } from "../types";
import { getTranslationValue } from "../utils/contentfulValueUtil";

type Props = {
	pageData: PageData;
};

export default function Shop(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	return (
		<>
			<PageSectionHeader
				title={getTranslationValue(
					props.pageData.pageTranslations.fields.shop,
					languageIso,
				)}
			/>

			<PageSectionNarrow>
				<div className={"grid grid-cols-1 gap-3 sm:gap-10"}>
					{props.pageData.pageConfig.fields?.albums?.pl?.map(
						(album) =>
							"fields" in album && (
								<AlbumCardHorizontal
									key={album?.sys.id}
									album={album}
									languageIso={languageIso}
									seeButtonText={getTranslationValue(
										props.pageData.pageTranslations.fields.seeAlbum,
										languageIso,
									)}
								/>
							),
					)}
				</div>
			</PageSectionNarrow>
		</>
	);
}
