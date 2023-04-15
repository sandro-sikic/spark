export default function Choice({
	text,
	image,
	onClick,
}: {
	text: string;
	image: string;
	onClick: () => void;
}) {
	return (
		<button onClick={onClick}>
			<img src={image} alt="" />
			<span>{text}</span>
		</button>
	);
}
