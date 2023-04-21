export async function getServerSideProps() {
	let book: any = await fetch(`${process.env.API_URL}/books/new`);

	book = await book.json();

	return {
		redirect: {
			permanent: false,
			destination: `/book/${book.book}/0`,
		},
	};
}

export default function NewBook() {}
