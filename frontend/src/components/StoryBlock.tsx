export default function StoryBlock({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	return (
		<div
			className={`backdrop-blur-2xl px-10 py-5 border rounded-md border-gray-400 bg-gray-900 bg-opacity-60  ${className}`}
		>
			<p className="font-sm">{text}</p>
		</div>
	);
}
