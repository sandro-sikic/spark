import BackButton from '@/components/BackButton';
import Choice from '@/components/Choice';
import StoryBlock from '@/components/StoryBlock';
import NextButton from '@/components/NextButton';
import AnimatedGradient from '@/components/AnimatedGradient';
import { useRouter } from 'next/router';
import AnimatedImage from '@/components/AnimatedImage';

type ChoiceType = {
	text: string;
	type: string;
	image_url: string;
	image_description: string;
	description: string;
	is_chosen: boolean;
};

type StoryLineType = {
	text: string;
	type: string;
	image_url: string;
	choices: ChoiceType[];
};

type ParamsType = {
	book: string;
	storyline_order: string;
};

export async function getServerSideProps({ params }: { params: ParamsType }) {
	// TODO: check route parameters if they work here
	let data = await fetch(`http://127.0.0.1:8000/story`);
	data = await data.json();

	return {
		props: {
			data,
			params,
		},
	};
}

function StoryLine({
	data,
	params,
}: {
	data: StoryLineType;
	params: ParamsType;
}) {
	return (
		<>
			<StoryBlock text={data.text} className="z-10 max-w-3xl mt-20" />

			<AnimatedGradient fromColor="#522363" toColor="#234463" />

			<AnimatedImage
				className="fixed top-10 right-10 bottom-0 left-0 rounded-3xl md:left-[20%] h-full w-full object-cover shadow-md"
				src={data.image_url}
			/>

			<NextButton
				href={`/story/${params.book}/${parseInt(params.storyline_order) + 1}`}
				className="z-10 mt-20"
			/>
		</>
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
		<div className="max-w-screen-lg">
			<AnimatedGradient bottom={0} fromColor="#522363" toColor="#234463" />

			<div className="z-10 relative mx-auto flex flex-col flex-grow justify-center max-w-screen-md w-full h-full">
				<div className="flex flex-wrap">
					<div className="flex-[0_0_33.3%] flex justify-center">
						<h1 className="w-40 capitalize text-2xl sm:text-4xl mb-2">
							{data[0].type}
						</h1>
					</div>
				</div>

				<div className="flex flex-wrap">
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
		<main className="flex flex-col px-3 py-10 md:px-20 relative min-h-screen mx-auto max-w-screen-2xl ">
			<header className="z-10 relative flex pt-10 items-center">
				<BackButton />
			</header>

			{Array.isArray(data) && <ChoiceLine data={data} params={params} />}

			{!Array.isArray(data) && typeof data === 'object' && (
				<StoryLine data={data} params={params} />
			)}
		</main>
	);
}
