import type { Options } from "@contentful/rich-text-react-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
	BLOCKS,
	type Document,
	INLINES,
	MARKS,
} from "@contentful/rich-text-types";
import type { ReactNode } from "react";

interface ContentfulAsset {
	fields: {
		file: {
			url: string;
			details?: { size: number; image: { width: number; height: number } };
			fileName: string;
			contentType: string;
		};
		title: string;
	};
}

const options: Options = {
	renderMark: {
		[MARKS.BOLD]: (text: ReactNode) => (
			<strong className="font-bold text-gray-950 dark:text-white">
				{text}
			</strong>
		),
		[MARKS.ITALIC]: (text: ReactNode) => <em className="italic">{text}</em>,
		[MARKS.UNDERLINE]: (text: ReactNode) => (
			<u className="underline underline-offset-4">{text}</u>
		),
		[MARKS.CODE]: (text: ReactNode) => (
			<code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 font-mono text-sm text-pink-600 dark:text-pink-400">
				{text}
			</code>
		),
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (_node, children: ReactNode) => (
			<p className="mb-6 leading-relaxed last:mb-0">{children}</p>
		),
		[BLOCKS.HEADING_1]: (_node, children: ReactNode) => (
			<h1 className="text-4xl font-extrabold tracking-tight mb-8 mt-12 first:mt-0">
				{children}
			</h1>
		),
		[BLOCKS.HEADING_2]: (_node, children: ReactNode) => (
			<h2 className="text-3xl font-bold tracking-tight mb-6 mt-10 first:mt-0 border-b border-gray-200 pb-2">
				{children}
			</h2>
		),
		[BLOCKS.HEADING_3]: (_node, children: ReactNode) => (
			<h3 className="text-2xl font-semibold mb-4 mt-8 first:mt-0">
				{children}
			</h3>
		),
		[BLOCKS.UL_LIST]: (_node, children: ReactNode) => (
			<ul className="list-disc pl-6 mb-6 space-y-2 marker:text-blue-500">
				{children}
			</ul>
		),
		[BLOCKS.OL_LIST]: (_node, children: ReactNode) => (
			<ol className="list-decimal pl-6 mb-6 space-y-2 marker:font-bold">
				{children}
			</ol>
		),
		[BLOCKS.LIST_ITEM]: (_node, children: ReactNode) => <li>{children}</li>,
		[BLOCKS.QUOTE]: (_node, children: ReactNode) => (
			<blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-6 italic my-8 text-gray-600 dark:text-gray-400">
				{children}
			</blockquote>
		),
		[BLOCKS.HR]: () => (
			<hr className="my-10 border-gray-200 dark:border-gray-800" />
		),
		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const target = node.data.target as ContentfulAsset;
			if (!target?.fields?.file) return null;

			const { file, title } = target.fields;
			return (
				<figure className="my-10">
					<img
						src={file.url}
						alt={title || "Contentful Asset"}
						className="rounded-xl shadow-lg w-full object-cover"
					/>
					{title && (
						<figcaption className="mt-3 text-center text-sm text-gray-500">
							{title}
						</figcaption>
					)}
				</figure>
			);
		},
		[INLINES.HYPERLINK]: (node, children: ReactNode) => (
			<a
				href={node.data.uri as string}
				className="text-blue-600 hover:text-blue-800 underline transition-colors"
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		),
	},
};

interface RichTextProps {
	document: Document | null | undefined;
	className?: string;
}

export default function ContentfulRichText({
	document,
	className = "",
}: RichTextProps) {
	if (!document) return null;

	return (
		<article className={className}>
			{documentToReactComponents(document, options)}
		</article>
	);
}
