import React from "react";
import PropTypes, { arrayOf } from "prop-types";

const SortArrows = ({ upArrowClick, downArrowClick, arrowsProps }) => {
	return (
		<span>
			<span onClick={upArrowClick}>
				<svg fill="currentColor" width={arrowsProps.width} height={arrowsProps.height} viewBox="0 0 40 40" style={arrowsProps.style} size={arrowsProps.size} preserveAspectRatio="xMidYMid meet">
					<g>
						<path d="m11.64 23.36l8.36-8.36 8.36 8.36h-16.71666666666667z" />
					</g>
				</svg>
			</span>
			<span onClick={downArrowClick}>
				<svg fill="currentColor" width={arrowsProps.width} height={arrowsProps.height} viewBox="0 0 40 40" style={arrowsProps.style} size={arrowsProps.size} preserveAspectRatio="xMidYMid meet">
					<g>
						<path d="m11.64 16.64h16.716666666666665l-8.356666666666666 8.36z"></path>
					</g>
				</svg>
			</span>
		</span>
	);
}

export default SortArrows;

SortArrows.propTypes = {
	upArrowClick: PropTypes.func.isRequired,
	downArrowClick: PropTypes.func.isRequired,
	arrowsProps: PropTypes.object
};

