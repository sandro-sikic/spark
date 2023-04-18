import Book from '@/components/Book';
import BackButton from '@/components/BackButton';

export default function Bookshelf() {
	return (
		<div className='w-full '>
			<div className='flex p-10 items-center w-full justify-between'>
				<BackButton />
				<h1 className='text-5xl self-center'>Bookshelf</h1>
				<div></div>
			</div>

			<div className='w-full mx-auto flex-col items-center content-center'>
				<Book
					title="The adventures of Lily and Leo"
					genre='Fantasy'
				/>
				<Book
					title="The adventures of Lily and Leo"
					genre='Fantasy'
				/>
				<Book
					title="The adventures of Lily and Leo"
					genre='Fantasy'
				/>
				<Book
					title="The adventures of Lily and Leo"
					genre='Fantasy'
				/>
				<Book
					title="The adventures of Lily and Leo"
					genre='Fantasy'
				/>
				<Book
					title="The adventures of Lily and Leo"
					genre='Fantasy'
				/>
				<Book
					title="The adventures of Lily and Leo"
					genre='Fantasy'
				/>


			</div>
		</div>
	);
}
