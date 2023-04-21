import BackButton from '@/components/BackButton';
import AnimatedGradient from '@/components/AnimatedGradient';

function Bro({
	name,
	image,
	role,
	github,
	linkedin,
}: {
	name: string;
	image: string;
	role: string;
	github: string;
	linkedin: string;
}) {
	return (
		<div className="m-10 md:m-0 flex flex-col">
			<img
				className="h-44 w-44 rounded-full shadow-2xl flex-shrink-0"
				src={image}
				alt={name}
			/>

			<h3 className="text-2xl tracking-wider mt-4">{name}</h3>

			<p className="text-sm tracking-wider mt-1">{role}</p>

			<div className="flex mt-1 items-center">
				<a
					className="mr-3 hover:scale-125 transition-transform active:scale-105"
					href={github}
					target="_blank"
				>
					<svg
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.501 0C4.97601 0 0.501009 4.475 0.501009 10C0.499805 12.0992 1.15961 14.1454 2.38682 15.8484C3.61403 17.5515 5.34634 18.8249 7.33801 19.488C7.83801 19.575 8.02601 19.275 8.02601 19.012C8.02601 18.775 8.01301 17.988 8.01301 17.15C5.50101 17.613 4.85101 16.538 4.65101 15.975C4.53801 15.687 4.05101 14.8 3.62601 14.562C3.27601 14.375 2.77601 13.912 3.61301 13.9C4.40101 13.887 4.96301 14.625 5.15101 14.925C6.05101 16.437 7.48801 16.012 8.06301 15.75C8.15101 15.1 8.41301 14.663 8.70101 14.413C6.47601 14.163 4.15101 13.3 4.15101 9.475C4.15101 8.387 4.53801 7.488 5.17601 6.787C5.07601 6.537 4.72601 5.512 5.27601 4.137C5.27601 4.137 6.11301 3.875 8.02601 5.163C8.84007 4.93706 9.68118 4.82334 10.526 4.825C11.376 4.825 12.226 4.937 13.026 5.162C14.939 3.862 15.776 4.138 15.776 4.138C16.326 5.513 15.976 6.538 15.876 6.788C16.513 7.488 16.901 8.375 16.901 9.475C16.901 13.313 14.564 14.163 12.338 14.413C12.701 14.725 13.014 15.325 13.014 16.263C13.014 17.6 13.001 18.675 13.001 19.013C13.001 19.275 13.189 19.587 13.689 19.487C15.6739 18.8166 17.3985 17.5408 18.6203 15.8389C19.8421 14.1371 20.4995 12.095 20.5 10C20.5 4.475 16.025 0 10.5 0H10.501Z"
							fill="white"
						/>
					</svg>
				</a>

				<a
					className="mr-3 hover:scale-125 transition-transform active:scale-105"
					href={linkedin}
					target="_blank"
				>
					<svg
						width="19"
						height="18"
						viewBox="0 0 19 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16.5 0C17.0304 0 17.5391 0.210714 17.9142 0.585786C18.2893 0.960859 18.5 1.46957 18.5 2V16C18.5 16.5304 18.2893 17.0391 17.9142 17.4142C17.5391 17.7893 17.0304 18 16.5 18H2.5C1.96957 18 1.46086 17.7893 1.08579 17.4142C0.710714 17.0391 0.5 16.5304 0.5 16V2C0.5 1.46957 0.710714 0.960859 1.08579 0.585786C1.46086 0.210714 1.96957 0 2.5 0H16.5ZM16 15.5V10.2C16 9.33539 15.6565 8.5062 15.0452 7.89483C14.4338 7.28346 13.6046 6.94 12.74 6.94C11.89 6.94 10.9 7.46 10.42 8.24V7.13H7.63V15.5H10.42V10.57C10.42 9.8 11.04 9.17 11.81 9.17C12.1813 9.17 12.5374 9.3175 12.7999 9.58005C13.0625 9.8426 13.21 10.1987 13.21 10.57V15.5H16ZM4.38 5.56C4.82556 5.56 5.25288 5.383 5.56794 5.06794C5.883 4.75288 6.06 4.32556 6.06 3.88C6.06 2.95 5.31 2.19 4.38 2.19C3.93178 2.19 3.50193 2.36805 3.18499 2.68499C2.86805 3.00193 2.69 3.43178 2.69 3.88C2.69 4.81 3.45 5.56 4.38 5.56ZM5.77 15.5V7.13H3V15.5H5.77Z"
							fill="white"
						/>
					</svg>
				</a>
			</div>
		</div>
	);
}

export default function AboutUs() {
	return (
		<>
			<AnimatedGradient right={0} fromColor="#234463" toColor="#522363" />

			<AnimatedGradient bottom={0} fromColor="#522363" toColor="#234463" />

			<main className="z-10 px-3 relative min-h-screen mx-auto max-w-screen-lg">
				<header className="relative flex pt-10 items-center">
					<BackButton className="z-10 p-2" />

					<h1 className="absolute w-full text-4xl flex-grow text-center">
						About us
					</h1>
				</header>
				<div className="mx-auto max-w-screen-md w-full pt-44">
					<h2 className="text-2xl mb-5">Team Code Vision</h2>
					<section className="flex flex-grow flex-wrap items-center md:justify-between justify-center">
						<Bro
							name="Sandro Šikić"
							image="https://avatars.githubusercontent.com/u/38315243?v=4"
							role="Team Lead"
							github="https://github.com/sandro-sikic"
							linkedin="https://www.linkedin.com/in/sandro-%C5%A1iki%C4%87/"
						/>
						<Bro
							name="Ronald Suplina"
							image="https://avatars.githubusercontent.com/u/29492908?v=4"
							role="Solutions Engineer"
							github="https://github.com/Vucko95"
							linkedin="https://www.linkedin.com/in/ronaldsuplina/"
						/>
						<Bro
							name="Luka Balta"
							image="https://avatars.githubusercontent.com/u/95940744?v=4"
							role="Frontend developer"
							github="https://github.com/LukaBalta"
							linkedin="https://www.linkedin.com/in/luka-balta-a36a67241/"
						/>
					</section>
					<footer className="pt-36">
						<p>
							hackathon submission @{' '}
							<a
								href="https://lablab.ai/event/stable-diffusion-ai-hackathon"
								target="_blank"
							>
								lablab.ai
							</a>
						</p>
					</footer>
				</div>
			</main>
		</>
	);
}
