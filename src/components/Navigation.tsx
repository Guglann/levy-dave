import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import type { PageData } from "../types";
import { getStringTranslation } from "../utils/translationUtil";
import Dropdown from "./Dropdown";
import Link from "./Link";
import LazyImage from "./LazyImage";
import {getAssetUrl, getTranslationValue} from "../utils/contentfulValueUtil";

type Props = {
	languageIso: string;
	pageData: PageData;
};

export default function Navigation(props: Props) {
	const navigate = useNavigate();
	const location = useLocation();

	const onLanguageChange = (newIso: string) => {
		const currentPath = location.pathname.split("/").slice(2).join("/");

		navigate(`/${newIso}/${currentPath}`);
	};

	return (
		<nav className={"sticky top-0 z-50 shadow-xl bg-white"}>
			<div className={"grid grid-cols-[1fr_auto_1fr] p-4"}>
				<div></div>
				<ReactLink to={"https://linktr.ee/levydave"} target={"_blank"}>
					<LazyImage url={getAssetUrl(props.pageData.pageConfig.fields.logo)} alt={'Levy Dave'} classNames={['h-10', 'w-auto', 'object-contain']}/>
				</ReactLink>
				<div className={"flex justify-end items-center gap-2"}>
					<Dropdown
						size={"small"}
						color={"brand"}
						variant={"ghost"}
						options={props.pageData.locales.items.map((locale) => ({
							id: locale.code,
							label: locale.name,
						}))}
						initialOptionId={props.languageIso}
						onChange={(e) => {
							onLanguageChange(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className={"bg-brand-700 px-4 py-2 flex justify-center gap-4"}>
				<Link
					text={getTranslationValue(props.pageData.pageTranslations.fields.shop, props.languageIso)}
					to={`/${props.languageIso}`}
					size={"medium"}
					color={"white"}
				/>
				<Link
					text={getTranslationValue(props.pageData.pageTranslations.fields.aboutLabel, props.languageIso)}
					to={`/${props.languageIso}/about`}
					size={"medium"}
					color={"white"}
				/>
			</div>
		</nav>
	);
}
