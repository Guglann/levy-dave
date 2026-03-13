type Props = {
	title: string;
};

export default function PageSectionHeader(props: Props) {
	return (
		<header
			className={"h-30 bg-brand-500/40 p-5 flex justify-center items-center"}
		>
			<h2 className={"text-3xl font-light capitalize"}>{props.title}</h2>
		</header>
	);
}
