import { useParams } from "react-router-dom";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import type { PageData, RouteParams } from "../types";
import {
	getDocumentTranslation,
	getStringTranslation,
} from "../utils/translationUtil";

type Props = {
	pageData: PageData;
};

export default function About(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	return (
		<>
			<PageSectionHeader
				title={getStringTranslation(
					props.pageData.translations,
					"aboutLabel",
					languageIso,
				)}
			/>

			<PageSectionNarrow>
				<div
					dangerouslySetInnerHTML={{
						__html: getDocumentTranslation(
							props.pageData.translations['oWydawnictwie'],
							languageIso,
						),
					}}
				/>
			</PageSectionNarrow>
		</>
	);
}
