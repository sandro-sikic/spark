export default function AnimatedImage({
	src,
	className,
}: {
	src: string;
	className?: string;
}) {
	function getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	return (
		<>
			<style jsx>{`
				@keyframes animate {
					0% {
						transform: translate(
								${getRandomInt(2, 25)}%,
								-${getRandomInt(2, 25)}%
							)
							scale(1.5);
					}
					80% {
						transform: translate(-12%, -12%) scale(1.3);
					}
					100% {
						transform: translate(-12%, -12%) scale(1.3);
					}
				}

				@keyframes animate1 {
					0% {
						transform: translate(-12%, -12%) scale(1.3);
					}
					10% {
						transform: translate(
								-${getRandomInt(2, 12)}%,
								${getRandomInt(2, 12)}
							)
							scale(1.3);
					}
					20% {
						transform: translate(0%, -${getRandomInt(2, 12)}%) scale(1.3);
					}
					30% {
						transform: translate(-${getRandomInt(2, 12)}%, 0%) scale(1.3);
					}
					40% {
						transform: translate(${getRandomInt(2, 12)}, ${getRandomInt(2, 12)})
							scale(1.3);
					}
					50% {
						transform: translate(
								-${getRandomInt(2, 12)}%,
								-${getRandomInt(2, 12)}%
							)
							scale(1.3);
					}
					60% {
						transform: translate(
								-${getRandomInt(2, 12)}%,
								${getRandomInt(2, 12)}
							)
							scale(1.3);
					}
					70% {
						transform: translate(0%, -${getRandomInt(2, 12)}%) scale(1.3);
					}
					80% {
						transform: translate(-${getRandomInt(2, 12)}%, 0%) scale(1.3);
					}
					90% {
						transform: translate(${getRandomInt(2, 12)}, ${getRandomInt(2, 12)})
							scale(1.3);
					}
					100% {
						transform: translate(-12%, -12%) scale(1.3);
					}
				}
			`}</style>

			<div className={`overflow-hidden flex-shrink-0 ${className}`}>
				<img
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						animation: 'animate 10s, animate1 100s ease-in-out 10s infinite',
					}}
					src={src}
				/>
			</div>
		</>
	);
}
