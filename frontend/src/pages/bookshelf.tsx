import Book from '@/components/Book';
import BackButton from '@/components/BackButton';

export default function Bookshelf() {
	return (
		<div>
			<BackButton />
			<h1>Bookshelf</h1>

			<div>
				<Book title="Book title" />
			</div>
		</div>
	);
}
