import { useParams } from "react-router-dom";
import ContentfulRichText from "../components/ContentfulRichText";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import type { PageData, RouteParams } from "../types";
import { getTranslationValue } from "../utils/contentfulValueUtil";

type Props = {
	pageData: PageData;
};

export default function Contact(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	return (
		<>
			<PageSectionHeader
				title={getTranslationValue(
					props.pageData.pageTranslations.fields.kontaktLabel,
					languageIso,
				)}
			/>

			<PageSectionNarrow>
				<ContentfulRichText
					document={
						props.pageData.pageTranslations.fields.kontakt?.[languageIso]
					}
				/>
			</PageSectionNarrow>
		</>
	);
}
