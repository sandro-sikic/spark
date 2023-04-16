import React from 'react';

interface ChoiceProps {
	text: string;
	image: string;
	onClick: () => void;
	type: string;
}

type StylesTypes = {
	[key: string]: {},
}

export default function Choice({
	text,
	image,
	onClick,
	type,
}: ChoiceProps) {
	const styles: StylesTypes = {
		'category': {
			minWidth: '10rem',
			height: '10rem',
		},
		'action': {
			borderRadius: '60px 10px 60px 10px',
			minWidth: '8rem',
		},
		'hero': {
			borderRadius: '150px',
			minWidth: '8rem',
		},
		'setting': {
			borderRadius: '20px',
			minWidth: '8rem',
		}
	}

	if (type === 'category') {
		return (
			<button onClick={onClick}>
				<svg className='mb-4 w-32' viewBox="0 0 152 152">
					<defs >

						<clipPath id='category'>
							<path d="M0 76C0 14.44 14.44 0 76 0C137.56 0 152 14.44 152 76C152 137.56 137.56 152 76 152C14.44 152 0 137.56 0 76Z" fill="" />
						</clipPath>
					</defs>
					<image clip-path='url(#category)' style={styles[type]} xlinkHref={image} alt="" />
				</svg>
				<span className='text-2xl'>{text}</span>
			</button>
		)
	}

	return (
		<button onClick={onClick}>
			<img className='mb-4' src={image} style={styles[type]} alt="" />
			<span className='text-2xl'>{text}</span>
		</button>
	);
}