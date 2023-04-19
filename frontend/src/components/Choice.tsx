import React from 'react';

interface ChoiceProps {
	text: string;
	selected: string;
	image: string;
	onClick: () => void;
	type: string;
}

type StylesTypes = {
	[key: string]: {},
}

export default function Choice({
	text,
	selected,
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
			<button className='pr-40 pb-20' onClick={onClick}>
				<svg className=' w-40' viewBox="0 0 152 152">
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
			<img className='w-40 h-40' src={image} style={styles[type]} alt="" />
			<span className='text-2xl'>{text}</span>
		</button>
	);
}