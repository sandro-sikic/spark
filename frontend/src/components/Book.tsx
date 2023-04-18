export default function Book({ title, genre }: { title: string, genre: string }) {
	return (
		<div className="w-full flex items-center justify-center p-20">
			<svg width="157" height="220" viewBox="0 0 157 220" fill="none">
				<rect y="12.5475" width="143.878" height="207.452" fill="url(#pattern0)" />
				<path d="M12.5475 0H156.426L143.878 12.5475H0L12.5475 0Z" fill="#353535" />
				<path d="M143.878 12.5475L156.425 0V207.452L143.878 220V12.5475Z" fill="#212121" />
				<defs>
					<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"                     >
						<use xlinkHref="#image0_32_128" transform="matrix(0.00281613 0 0 0.00195312 -0.22093 0)" />                     </pattern>
					<image id="image0_32_128" width="512" height="512" preserveAspectRatio="xMidYMid slice" xlinkHref="setting.png" />
				</defs>
			</svg>
			<div className="flex-col pl-24">
				<h1 className="text-3xl">{title}</h1>
				<h2>{genre}</h2>
			</div>

		</div>
	);
}
