import Book from '@/components/Book';
import BackButton from '@/components/BackButton';
import AnimatedGradient from '@/components/AnimatedGradient';

export default function Bookshelf() {
	return (
		<>
			<AnimatedGradient fromColor="#234463" toColor="#522363" />

			<main className="px-3 relative min-h-screen mx-auto max-w-screen-lg">
				<header className="relative flex pt-10 items-center">
					<BackButton className="z-10 p-2" />

					<h1 className="absolute w-full text-4xl flex-grow text-center">
						Bookshelf
					</h1>
				</header>

				<div className="mx-auto max-w-screen-md w-full pt-44">
					<div className="flex items-center">
						<Book image="https://edit.org/images/cat/book-covers-big-2019101610.jpg" />
						<div className="flex-col ml-12">
							<h1 className="text-3xl">The adventures of Lily and Leo</h1>
							<h2>Fantasy</h2>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
