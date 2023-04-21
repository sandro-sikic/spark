import Book from '@/components/Book';
import BackButton from '@/components/BackButton';
import AnimatedGradient from '@/components/AnimatedGradient';
import Link from 'next/link';

export async function getServerSideProps() {
	let books: any = await fetch(`http://127.0.0.1:8000/books`);

	books = await books.json();

	return {
		props: {
			books,
		},
	};
}

export default function Bookshelf({ books }: { books: any }) {
	return (
		<>
			<AnimatedGradient fromColor="#234463" toColor="#522363" />

			<main className="z-10 px-3 relative min-h-screen mx-auto max-w-screen-lg">
				<header className="relative flex pt-10 items-center">
					<BackButton className="z-10 p-2" />

					<h1 className="absolute w-full text-4xl flex-grow text-center">
						Bookshelf
					</h1>
				</header>

				<div className="mx-auto max-w-screen-md w-full pt-44">
					{books.map((book: any) => (
						<Link
							className="flex items-center mb-4"
							key={book._id}
							href={`/book/${book._id}/0`}
						>
							<Book image="https://edit.org/images/cat/book-covers-big-2019101610.jpg" />
							<div className="flex-col ml-6 sm:ml-12">
								<h1 className="text-3xl">The adventures of Lily and Leo</h1>
								<h2>Fantasy</h2>
							</div>
						</Link>
					))}
				</div>
			</main>
		</>
	);
}
