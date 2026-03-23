import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import PhotoGallery from "../components/PhotoGallery";
import type { PageData, RouteParams } from "../types";
import {
	getAlbumImages,
	getHtmlString,
	getTranslationValue,
} from "../utils/contentfulValueUtil";

type Props = {
	pageData: PageData;
};

export default function Album(props: Props) {
	const { id, languageIso } = useParams() as RouteParams;

	const album = props.pageData.albums.items.find(
		(a) => getTranslationValue(a.fields.id, "en") === id,
	);

	if (!album) {
		return;
	}

	return (
		<>
			<PageSectionHeader
				title={getTranslationValue(album.fields.artistname, "en")}
			/>

			<PageSectionNarrow>
				<div className={"mb-6"}>
					<Button
						text={getTranslationValue(
							props.pageData.pageTranslations.fields.back,
							languageIso,
						)}
						size={"medium"}
						variant={"ghost"}
						color={"brand"}
						to={`/${languageIso}`}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-5 gap-y-12 md:gap-x-12 md:gap-y-12">
					<div className="col-span-2">
						<PhotoGallery images={getAlbumImages(album)} />
					</div>
					<div className="col-span-3">
						<div className={"text-2xl mb-6 font-semibold"}>
							{getTranslationValue(album.fields.title, "en")}
						</div>
						<div
							className="text-lg mb-4"
							dangerouslySetInnerHTML={{
								__html: getHtmlString(album.fields.description, languageIso),
							}}
						/>
						<div className={"mb-6"}>
							<div className="text-lg mb-2">
								{getTranslationValue(
									props.pageData.pageTranslations.fields.tracks,
									languageIso,
								)}
							</div>

							<ol className="list-decimal list-inside text-lg font-light">
								{album.fields.tracks?.en?.map((track) => (
									<li key={track}>{track}</li>
								))}
							</ol>
						</div>
						<div className={"flex gap-3"}>
							<Button
								text={getTranslationValue(
									props.pageData.pageTranslations.fields.orderButton,
									languageIso,
								)}
								size={"medium"}
								variant={"primary"}
								color={"brand"}
								to={getTranslationValue(
									props.pageData.pageConfig.fields.purchaseFormUrl,
									languageIso,
								)}
							/>
							<Button
								text={getTranslationValue(
									props.pageData.pageTranslations.fields.pagelink,
									languageIso,
								)}
								size={"medium"}
								variant={"ghost"}
								color={"brand"}
								to={album.fields.pagelink?.en}
							/>
						</div>
					</div>
				</div>
			</PageSectionNarrow>
		</>
	);
}
