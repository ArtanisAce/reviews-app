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

  const arrowsProps = {
    size: 16,
    width: 16,
    height: 16,
    style: { "vertical-align": "middle", display: "inline-block", fill: "#666" }
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
            <SortArrows upArrowClick={reviewSortAsc} downArrowClick={reviewSortDesc} arrowsProps={arrowsProps} />
          </th>
          <th>
            <span style={{ "text-align": "left" }}>
              Travel date
            </span>
            <SortArrows upArrowClick={travelSortAsc} downArrowClick={travelSortDesc} arrowsProps={arrowsProps} />
          </th>
          <th>Rating</th>
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
