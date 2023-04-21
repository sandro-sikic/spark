export async function getServerSideProps() {
	let book: any = await fetch(`http://127.0.0.1:8000/books/new`);

	book = await book.json();

	return {
		redirect: {
			permanent: false,
			destination: `/book/${book.book}/0`,
		},
	};
}

export default function NewBook() {}
