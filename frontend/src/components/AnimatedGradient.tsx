export default function AnimatedGradient({
	fromColor,
	toColor,
	left,
	right,
	top,
	bottom,
}: {
	fromColor: string;
	toColor: string;
	right?: number | null;
	bottom?: number | null;
	top?: number | null;
	left?: number | null;
}) {
	const animationDurationSeconds = 10;

	return (
		<>
			<style jsx>{`
				@keyframes animatedGradientAnimationFrom {
					0% {
						opacity: 0;
					}
					50% {
						opacity: 1;
					}
					100% {
						opacity: 0;
					}
				}

				@keyframes animatedGradientAnimationTo {
					0% {
						opacity: 1;
					}
					50% {
						opacity: 0;
					}
					100% {
						opacity: 1;
					}
				}
			`}</style>

			<div
				style={{
					position: 'absolute',
					zIndex: '0',
					height: '230vh',
					width: '260vh',
					background: `radial-gradient(
							50% 50% at 50% 50%,
							${fromColor} 0%,
							rgba(0, 0, 0, 0) 100%
						)`,
					right: right + 'rem',
					left: left + 'rem',
					top: top + 'rem',
					bottom: bottom + 'rem',
					animation: `animatedGradientAnimationFrom ${animationDurationSeconds}s ease-in-out infinite`,
				}}
			/>

			<div
				style={{
					position: 'absolute',
					zIndex: '0',
					height: '230vh',
					width: '260vh',
					background: `radial-gradient(
							50% 50% at 50% 50%,
							${toColor} 0%,
							rgba(0, 0, 0, 0) 100%
						)`,
					right: right + 'rem',
					left: left + 'rem',
					top: top + 'rem',
					bottom: bottom + 'rem',
					animation: `animatedGradientAnimationTo ${animationDurationSeconds}s ease-in-out infinite`,
				}}
			/>
		</>
	);
}
