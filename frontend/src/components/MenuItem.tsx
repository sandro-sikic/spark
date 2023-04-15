export default function MenuItem({
	href,
	title,
	description,
}: {
	href: string;
	title: string;
	description: string;
}) {
	return (
		<a
			href={href}
			className="group rounded-lg border border-transparent px-6 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
			target="_blank"
			rel="noopener noreferrer"
		>
			<h1 className="mb-3 text-2xl font-semibold">
				{`${title} `}
				<span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
					-&gt;
				</span>
			</h1>
			<p className="m-1 max-w-[30ch] text-sm opacity-50">{description}</p>
		</a>
	);
}
