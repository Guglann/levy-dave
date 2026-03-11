import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import type { PageData, RouteParams } from "../types";

type Props = {
	pageData: PageData;
};

export default function Album(props: Props) {
	const { languageIso, id } = useParams() as RouteParams;

	const album = props.pageData.config.albums.find((a) => a.id === id);

	if (!album) {
		return;
	}

	return (
		<div>
			<div className="mb-6">
				<ActionButton
					text={props.pageData.translations.back[languageIso]}
					linkUrl={`/${languageIso}`}
					variant={"ghost"}
					isDisabled={false}
				/>
			</div>
			<div className="grid grid-cold-1 md:grid-cols-2 gap-8">
				<div>
					<motion.img
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						src={album.coverSource}
						className="w-full mb-10"
					/>
				</div>
				<div>
					<h1 className="text-2xl mb-4">{album.title}</h1>
					<div
						className="text-lg text-white/70 leading-relaxed mb-6"
						dangerouslySetInnerHTML={{ __html: album.description[languageIso] }}
					/>
					{album.tracks.length && (
						<>
							<h3 className="text-xl mb-2">Tracks</h3>
							<ol className="list-decimal list-inside mb-12 text-lg">
								{album.tracks.map((track) => (
									<li key={track.name} className="text-white/70">
										{track.name}
									</li>
								))}
							</ol>
						</>
					)}
					<div>
						<ActionButton
							text={props.pageData.translations.orderButton[languageIso]}
							linkUrl={props.pageData.config.purchaseFormUrl}
							variant={"primary"}
							isDisabled={!album.isAvailableForPurchase}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
