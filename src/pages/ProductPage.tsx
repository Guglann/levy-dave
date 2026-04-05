import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import PhotoGallery from "../components/PhotoGallery";
import { AlbumProductData } from "../models/AlbumProductData";
import type { PageData, RouteParams } from "../types";
import { getTranslationValue } from "../utils/contentfulValueUtil";

type Props = {
	pageData: PageData;
};

export default function ProductPage(props: Props) {
	const { id, languageIso } = useParams() as RouteParams;

	const product = props.pageData.products.find(
		(product) => product.getId() === id,
	);

	if (!product) {
		return;
	}

	const longDescription = product.getLongDescription(languageIso);
	const subtype = product.getSubtype();

	return (
		<>
			<PageSectionHeader
				title={product.getBrand() ?? product.getName(languageIso)}
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
						<PhotoGallery images={product.getGalleryImages()} />
					</div>
					<div className="col-span-3 flex flex-col gap-y-6">
						<div className={"text-2xl font-semibold"}>
							{product.getName(languageIso)}
						</div>

						{longDescription && (
							<div
								className="text-lg font-light"
								dangerouslySetInnerHTML={{
									__html: longDescription,
								}}
							/>
						)}

						<div className={"font-light"}>
							Zostało: {product.getStockQuantity()}
						</div>

						{subtype instanceof AlbumProductData && (
							<>
								<div className="text-lg">
									{getTranslationValue(
										props.pageData.pageTranslations.fields.tracks,
										languageIso,
									)}
								</div>
								<ol className="list-decimal list-inside text-lg font-light">
									{subtype.getTracks().map((track) => (
										<li key={track}>{track}</li>
									))}
								</ol>
							</>
						)}

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
								to={"#"}
							/>
						</div>
					</div>
				</div>
			</PageSectionNarrow>
		</>
	);
}
