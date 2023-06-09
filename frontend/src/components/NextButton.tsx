import Link from 'next/link';

export default function NextButton({
	href,
	className,
}: {
	href: string;
	className?: string;
}) {
	return (
		<Link
			href={href}
			className={`flex items-center bg-white rounded-xl max-w-[200px] px-11 hover:scale-110 transition-transform active:scale-100 ${className}`}
		>
			<h2 className="text-black font-bold text-xl">Continue</h2>

			<svg
				className="ml-4"
				width="23"
				height="39"
				viewBox="0 0 23 39"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					className="fill-black"
					d="M0.939582 37.1562C0.313193 36.5299 0 35.7326 0 34.7646C0 33.7965 0.313193 32.9993 0.939582 32.3729L14.2646 19.0479L0.939582 5.72292C0.313193 5.09653 0 4.29931 0 3.33125C0 2.36319 0.313193 1.56597 0.939582 0.939582C1.56597 0.313193 2.36319 0 3.33125 0C4.2993 0 5.09653 0.313193 5.72292 0.939582L21.4396 16.6562C21.7812 16.9979 22.0238 17.3681 22.1673 17.7667C22.3108 18.1653 22.3814 18.5924 22.3792 19.0479C22.3792 19.5035 22.3074 19.9306 22.1639 20.3292C22.0204 20.7278 21.779 21.0979 21.4396 21.4396L5.72292 37.1562C5.09653 37.7826 4.2993 38.0958 3.33125 38.0958C2.36319 38.0958 1.56597 37.7826 0.939582 37.1562Z"
					fill="white"
				/>
			</svg>
		</Link>
	);
}
