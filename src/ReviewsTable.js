import React from "react";
import PropTypes from "prop-types";
import SortArrows from './SortArrows';

const ReviewsTable = ({ reviews, reviewSortAsc, reviewSortDesc, travelSortAsc, travelSortDesc }) => {
	function getReviewValues(review) {
		return [
			review.id,
			review.traveledWith,
			review.entryDate,
			review.travelDate,
			review.ratings.general.general
		];
	}

	function getReviewRow(review) {
		const reviewValues = getReviewValues(review);

		return reviewValues.map((value, index) => {
			return <td key={index}>{value}</td>;
		});
	}

	function getReviewsRows() {
		return reviews.map((review, index) => {
			return <tr key={index}>{getReviewRow(review)}</tr>;
		});
	}

	return (
		<table className="reviews-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Traveled With</th>
					<th>
						<span style={{ "text-align": "left" }}>
							Review date
						</span>
						<SortArrows upArrowClick={reviewSortAsc} downArrowClick={reviewSortDesc} />
					</th>
					<th>
						<span style={{ "text-align": "left" }}>
							Travel date
						</span>
						<SortArrows upArrowClick={travelSortAsc} downArrowClick={travelSortDesc}/>
					</th>
					<th>Rating</th>
					{/* <th>Aspects Rating</th>
          <th>User</th>
          <th>Locale</th> */}
				</tr>
			</thead>
			<tbody>{getReviewsRows()}</tbody>
		</table>
	);
};

ReviewsTable.propTypes = {
	reviews: PropTypes.array.isRequired,
	reviewSortAsc: PropTypes.func.isRequired,
	reviewSortDesc: PropTypes.func.isRequired,
	travelSortAsc: PropTypes.func.isRequired,
	travelSortDesc: PropTypes.func.isRequired,
};

export default ReviewsTable;
