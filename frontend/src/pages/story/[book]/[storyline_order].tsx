import BackButton from '@/components/BackButton';
import Choice from '@/components/Choice';
import StoryBlock from '@/components/StoryBlock';
import NextButton from '@/components/NextButton';

type ChoiceType = {
	text: string;
	category: string;
	image_url: string;
	image_description: string;
	description: string;
	is_chosen: boolean;
};

type ParamsType = {
	book: string;
	storyline_order: string;
};

export async function getServerSideProps({ params }: { params: ParamsType }) {
	// uncomment this to connect to api
	// TODO: transfer api host to env
	// let data = await fetch(`http://192.168.1.12:8000/openapi/test`);
	// data = await data.json();

	// example with text response
	const data = 'test';

	// example with array of choices
	// const data = [
	// 	{
	// 		text: 'Fantasy',
	// 		category: 'hero',
	// 		image_url:
	// 			'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
	// 		is_chosen: true,
	// 	},
	// 	{
	// 		text: 'test',
	// 		category: 'genre',
	// 		image_url:
	// 			'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
	// 		is_chosen: false,
	// 	},
	// ];

	return {
		props: {
			data,
			params,
		},
	};
}

export default function BookPage({
	data,
	params,
}: {
	data: ChoiceType[] | string;
	params: ParamsType;
}) {
	return (
		<div>
			<BackButton />

			<div className="flex">
				{Array.isArray(data) &&
					data.length > 0 &&
					data.map((choice: ChoiceType) => {
						return (
							<Choice
								key={choice.text}
								text={choice.text}
								image={choice.image_url}
								selected={choice.is_chosen}
								onClick={() => {
									console.log('clicked', choice.text);
								}}
							/>
						);
					})}
			</div>

			{typeof data === 'string' && <StoryBlock text={data} />}

			<NextButton
				href={`/story/${params.book}/${parseInt(params.storyline_order) + 1}`}
			/>
		</div>
	);
}
