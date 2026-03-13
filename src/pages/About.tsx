import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import type { PageData } from "../types";

const description =
	"Moją twórczość definiuje nieustanne poszukiwanie równowagi między surową naturą a nowoczesną formą. W swoich pracach często wykorzystuję tradycyjne techniki malarskie, łącząc je z eksperymentalnymi mediami cyfrowymi, co pozwala mi na eksplorację tematów związanych z upływem czasu i ulotnością chwili.";

type Props = {
	pageData: PageData;
};

export default function About(_props: Props) {
	return (
		<>
			<PageSectionHeader title={"O mnie"} />

			<PageSectionNarrow>
				<div className={"text-xl text-center"}>{description}</div>
			</PageSectionNarrow>
		</>
	);
}
