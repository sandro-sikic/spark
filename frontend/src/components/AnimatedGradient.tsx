export default function AnimatedGradient({
	fromColor,
	toColor,
	left = null,
	right = null,
	top = null,
	bottom = null,
}: {
	fromColor: string;
	toColor: string;
	right?: number | null;
	bottom?: number | null;
	top?: number | null;
	left?: number | null;
}) {
	const animationDurationSeconds = 20;

	const width = 1500;
	const height = 1500;

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
				className="sm:hidden"
				style={{
					position: 'fixed',
					zIndex: '-1',
					height: `${height}px`,
					width: `${width}px`,
					background: `radial-gradient(
							50% 50% at 50% 50%,
							${fromColor} 0%,
							rgba(0, 0, 0, 0) 100%
						)`,
					left: top === null ? undefined : top + 'rem',
					right: right === null ? undefined : `calc(${right}rem - ${width}px)`,
					top: top === null ? undefined : top + 'rem',
					bottom:
						bottom === null ? undefined : `calc(${bottom}rem - ${height}px)`,
					transform: 'translate(-50%, -50%)',
				}}
			/>

			<div
				className="hidden md:block"
				style={{
					position: 'fixed',
					zIndex: '-1',
					height: `${height}px`,
					width: `${width}px`,
					background: `radial-gradient(
							50% 50% at 50% 50%,
							${fromColor} 0%,
							rgba(0, 0, 0, 0) 100%
						)`,
					left: top === null ? undefined : top + 'rem',
					right: right === null ? undefined : `calc(${right}rem - ${width}px)`,
					top: top === null ? undefined : top + 'rem',
					bottom:
						bottom === null ? undefined : `calc(${bottom}rem - ${height}px)`,
					animation: `animatedGradientAnimationFrom ${animationDurationSeconds}s ease-in-out infinite`,
					transform: 'translate(-50%, -50%)',
				}}
			/>

			<div
				className="hidden md:block"
				style={{
					position: 'fixed',
					zIndex: '-1',
					height: `${height}px`,
					width: `${width}px`,
					background: `radial-gradient(
							50% 50% at 50% 50%,
							${toColor} 0%,
							rgba(0, 0, 0, 0) 100%
						)`,
					left: top === null ? undefined : top + 'rem',
					right: right === null ? undefined : `calc(${right}rem - ${width}px)`,
					top: top === null ? undefined : top + 'rem',
					bottom:
						bottom === null ? undefined : `calc(${bottom}rem - ${height}px)`,
					animation: `animatedGradientAnimationTo ${animationDurationSeconds}s ease-in-out infinite`,
					transform: 'translate(-50%, -50%)',
				}}
			/>
		</>
	);
}
