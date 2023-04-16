export default function Book({ title, genre }: { title: string, genre: string }) {
	return (
		<div className="w-full flex items-center justify-center p-20">
			<img src='book.png' />
			<div className="flex-col pl-24">
				<h1 className="text-3xl">{title}</h1>
				<h2>{genre}</h2>
			</div>

		</div>
	);
}
