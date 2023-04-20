import BackButton from '@/components/BackButton';
import Choice from '@/components/Choice';
import StoryBlock from '@/components/StoryBlock';
import NextButton from '@/components/NextButton';
import AnimatedGradient from '@/components/AnimatedGradient';
import { useRouter } from 'next/router';

type ChoiceType = {
	text: string;
	type: string;
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
	console.log(params);
	// uncomment this to connect to api
	// TODO: transfer api host to env
	// let data = await fetch(`http://192.168.1.12:8000/openapi/test`);
	// data = await data.json();

	// example with text response
	// const data = 'test';

	// example with array of choices
	const data = [
		{
			text: 'Fantasy',
			type: 'hero',
			image_url:
				'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
			is_chosen: false,
		},
		{
			text: 'test',
			type: 'genre',
			image_url:
				'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
			is_chosen: false,
		},
		{
			text: 'test',
			type: 'action',
			image_url:
				'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
			is_chosen: false,
		},
		{
			text: 'Fantasy',
			type: 'setting',
			image_url:
				'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
			is_chosen: false,
		},
		{
			text: 'test',
			type: 'genre',
			image_url:
				'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
			is_chosen: false,
		},
		{
			text: 'test',
			type: 'genre',
			image_url:
				'https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg',
			is_chosen: false,
		},
	];

	return {
		props: {
			data,
			params,
		},
	};
}

function StoryLine({ data, params }: { data: string; params: ParamsType }) {
	return (
		<div>
			<StoryBlock text={data} />

			<NextButton
				href={`/story/${params.book}/${parseInt(params.storyline_order) + 1}`}
			/>
		</div>
	);
}

function ChoiceLine({
	data,
	params,
}: {
	data: ChoiceType[];
	params: ParamsType;
}) {
	const navigate = useRouter();

	return (
		<div className="mx-auto flex flex-col flex-grow justify-center max-w-screen-md w-full h-full">
			<AnimatedGradient bottom={0} fromColor="#522363" toColor="#234463" />

			<div className="flex flex-wrap">
				<div className="flex-[0_0_33.3%] flex justify-center">
					<h1 className="w-40 capitalize text-2xl sm:text-4xl mb-2">
						{data[0].type}
					</h1>
				</div>
			</div>

			<div className="flex flex-wrap ">
				{Array.isArray(data) &&
					data.length > 0 &&
					data.map((choice: ChoiceType) => {
						return (
							<Choice
								key={choice.text}
								text={choice.text}
								type={choice.type}
								image={choice.image_url}
								selected={choice.is_chosen}
								className="flex-[0_0_33.3%] pt-8"
								onClick={() => {
									navigate.push(
										`/story/${params.book}/${
											parseInt(params.storyline_order) + 1
										}?choice=${choice.text}`
									);
								}}
							/>
						);
					})}
			</div>

			{data.some((choice: ChoiceType) => choice.is_chosen) && (
				<div className="flex flex-wrap">
					<div className="flex-[0_0_33.3%] flex justify-center">
						<div className="w-40">
							<NextButton
								href={`/story/${params.book}/${
									parseInt(params.storyline_order) + 1
								}`}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default function BookPage({
	data,
	params,
}: {
	data: ChoiceType[] | string;
	params: ParamsType;
}) {
	return (
		<main className="flex flex-col px-3 relative min-h-screen mx-auto max-w-screen-lg">
			<header className="relative flex pt-10 items-center">
				<BackButton />
			</header>

			{Array.isArray(data) && <ChoiceLine data={data} params={params} />}

			{typeof data === 'string' && <StoryLine data={data} params={params} />}
		</main>
	);
}
