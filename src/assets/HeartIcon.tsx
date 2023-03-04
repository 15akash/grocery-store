interface HeartIconProps {
	height?: number | undefined;
	width?: number | undefined;
	fill: string;
	stroke: string;
}

export const HeartIcon = (props: HeartIconProps) => {
	return (
		<svg
			style={{ width: `${props.width}px`, height: `${props.height}px`, cursor: 'pointer' }}
			width="61"
			height="53"
			viewBox="0 0 61 53"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_17_150)">
				<path
					d="M20.0086 1C11.9044 1 5 7.16621 5 15.1746C5 20.6992 7.54227 25.3504 10.9116 29.2033C14.2694 33.043 18.6014 36.266 22.5177 38.9635L29.2748 43.6177C30.0148 44.1274 30.9852 44.1274 31.7252 43.6177L38.4823 38.9635C42.3986 36.266 46.7306 33.043 50.0884 29.2033C53.4577 25.3504 56 20.6992 56 15.1746C56 7.16621 49.0956 1 40.9914 1C36.8139 1 33.1379 2.99324 30.5 5.57233C27.8621 2.99324 24.1861 1 20.0086 1Z"
					fill={props.fill}
					shapeRendering="crispEdges"
				/>
				<path
					d="M20.0086 1C11.9044 1 5 7.16621 5 15.1746C5 20.6992 7.54227 25.3504 10.9116 29.2033C14.2694 33.043 18.6014 36.266 22.5177 38.9635L29.2748 43.6177C30.0148 44.1274 30.9852 44.1274 31.7252 43.6177L38.4823 38.9635C42.3986 36.266 46.7306 33.043 50.0884 29.2033C53.4577 25.3504 56 20.6992 56 15.1746C56 7.16621 49.0956 1 40.9914 1C36.8139 1 33.1379 2.99324 30.5 5.57233C27.8621 2.99324 24.1861 1 20.0086 1Z"
					stroke={props.stroke}
					strokeOpacity="0.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					shapeRendering="crispEdges"
				/>
			</g>
			<defs>
				<filter id="filter0_d_17_150" x="0.5" y="0.5" width="60" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_150" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_150" result="shape" />
				</filter>
			</defs>
		</svg>
	);
};
