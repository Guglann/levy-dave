import type { LocalizedPageTranslations, LocalizedProduct } from "../types";
import { getTranslationValue } from "../utils/contentfulValueUtil";
import Button from "./Button";
import LazyImage from "./LazyImage";

type Props = {
	product: LocalizedProduct;
	translations: LocalizedPageTranslations;
	languageIso: string;
};

export default function ProductCardHorizontal(props: Props) {
	return (
		<div className={"grid grid-cols-1 sm:grid-cols-6"}>
			<div className={"col-span-2"}>
				<LazyImage
					url={
						"https://thumbs.dreamstime.com/b/closeup-square-portrait-calico-cat-9900445.jpg"
					}
					alt={"Product cover"}
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
					{getTranslationValue(props.product.fields.name, props.languageIso)}
				</div>

				<div className="text-lg font-light mb-7">
					{getTranslationValue(
						props.product.fields.shortDescription,
						props.languageIso,
					)}
				</div>

				<Button
					text={getTranslationValue(
						props.translations.fields.seeProduct,
						props.languageIso,
					)}
					size={"medium"}
					variant={"primary"}
					extraClasses={["shadow-md"]}
					color={"brand"}
					to={`/${props.languageIso}/product/${getTranslationValue(props.product.fields.id, "en")}`}
				/>
			</div>
		</div>
	);
}
