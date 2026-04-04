import type { Product } from "../models/Product";
import type { LocalizedPageTranslations } from "../types";
import { getTranslationValue } from "../utils/contentfulValueUtil";
import Button from "./Button";
import LazyImage from "./LazyImage";

type Props = {
	product: Product;
	translations: LocalizedPageTranslations;
	languageIso: string;
};

export default function ProductHorizontal(props: Props) {
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
					{props.product.getName(props.languageIso)}
				</div>

				<div className="text-lg font-light mb-7">
					{props.product.getShortDescription(props.languageIso)}
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
					to={`/${props.languageIso}/product/${props.product.getId()}`}
				/>
			</div>
		</div>
	);
}
