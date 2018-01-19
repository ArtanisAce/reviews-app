import React from "react";
import PropTypes from "prop-types";

// TODO: PASAR EL STYLE COMO PROP
const SortArrows = ({ upArrowClick, downArrowClick }) => {
	return (
		<span>
			<span onClick={upArrowClick}>
				<svg fill="currentColor" width="16" height="16" viewBox="0 0 40 40" style={{ "vertical-align": "middle", display: "inline-block", fill: "#666" }} size="16" preserveAspectRatio="xMidYMid meet">
					<g>
						<path d="m11.64 23.36l8.36-8.36 8.36 8.36h-16.71666666666667z" />
					</g>
				</svg>
			</span>
			<span onClick={downArrowClick}>
				<svg fill="currentColor" width="16" height="16" viewBox="0 0 40 40" style={{ "vertical-align": "middle", display: "inline-block", fill: "#666" }} size="16" preserveAspectRatio="xMidYMid meet">
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
	downArrowClick: PropTypes.func.isRequired
};

