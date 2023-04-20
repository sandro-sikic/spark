export default function StoryBlock({ text }: { text: string }) {
	return (
		<div className="backdrop-blur-lg px-10 py-5">
			<p>{text}</p>
		</div>
	);
}
