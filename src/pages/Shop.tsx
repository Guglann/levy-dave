import { useParams } from "react-router-dom";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import ProductHorizontal from "../components/ProductHorizontal";
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
				<div className={"grid grid-cols-1 gap-3 sm:gap-10 mb-6"}>
					{props.pageData.products.map((product) => (
						<ProductHorizontal
							key={product.getId()}
							product={product}
							languageIso={languageIso}
							translations={props.pageData.pageTranslations}
						/>
					))}
				</div>
			</PageSectionNarrow>
		</>
	);
}
