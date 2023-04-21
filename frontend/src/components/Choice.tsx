import React from 'react';

interface ChoiceProps {
	text: string;
	selected: boolean;
	image: string;
	onClick: () => void;
	type: string;
	className?: string;
}

type StylesTypes = {
	[key: string]: {};
};

export default function Choice({
	text,
	selected,
	image,
	onClick,
	type,
	className,
}: ChoiceProps) {
	const styles: StylesTypes = {
		action: {
			borderRadius: '40% 10% 40% 10%',
		},
		hero: {
			borderRadius: '100%',
		},
		setting: {
			borderRadius: '10%',
		},
	};

	if (type === 'genre') {
		return (
			<button
				className={`flex flex-col items-center flex-shrink-0 active:scale-105 hover:scale-110  transition-transform ${className}`}
				onClick={onClick}
			>
				<svg className="w-20 h-20 sm:w-40 sm:h-40" viewBox="0 0 152 152">
					<defs>
						<clipPath id="category">
							<path
								d="M0 76C0 14.44 14.44 0 76 0C137.56 0 152 14.44 152 76C152 137.56 137.56 152 76 152C14.44 152 0 137.56 0 76Z"
								fill=""
							/>
						</clipPath>
					</defs>

					<image
						className="w-40 h-40"
						clip-path="url(#category)"
						preserveAspectRatio="xMidYMid slice"
						xlinkHref={image}
					/>
				</svg>

				<span
					className="text-lg sm:text-2xl tracking-wider mt-2"
					style={{
						textDecoration: selected ? 'underline' : 'none',
					}}
				>
					{text}
				</span>
			</button>
		);
	}

	return (
		<button
			className={`flex flex-col items-center flex-shrink-0 active:scale-105 hover:scale-110  transition-transform ${className}`}
			onClick={onClick}
		>
			<img
				className="w-20 h-20 sm:w-40 sm:h-40"
				src={image}
				style={styles[type]}
			/>

			<span
				className="text-lg sm:text-2xl tracking-wider mt-2"
				style={{
					textDecoration: selected ? 'underline' : 'none',
				}}
			>
				{text}
			</span>
		</button>
	);
}
