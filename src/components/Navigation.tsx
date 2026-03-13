import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import type { PageData } from "../types";
import Dropdown from "./Dropdown";
import Link from "./Link";

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
					<img
						src={props.pageData.config.logoSource}
						alt="Levy Dave"
						className="h-10 w-auto object-contain"
					/>
				</ReactLink>
				<div className={"flex justify-end items-center gap-2"}>
					<Dropdown
						size={"medium"}
						color={"brand"}
						variant={"ghost"}
						options={props.pageData.languages.all.map((language) => ({
							id: language.iso,
							label: language.name,
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
					text={"Moja twórczość"}
					to={`/${props.languageIso}`}
					size={"medium"}
					color={"white"}
				/>
				<Link
					text={"O mnie"}
					to={`/${props.languageIso}/about`}
					size={"medium"}
					color={"white"}
				/>
			</div>
		</nav>
	);
}
