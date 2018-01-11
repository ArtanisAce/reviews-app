import React from 'react';
import PropTypes from 'prop-types';

const ReviewsTable = ({reviews}) => {

    function getReviewValues(review) {
        return [review.id, review.traveledWith, review.entryDate, review.travelDate, review.ratings.general.general]
    }

    function getReviewRow(review) {

        const reviewValues = getReviewValues(review);

        return (reviewValues.map((value, index) => {
            return (
                <td key={index}>{value}</td>
            )
        }))
    }

    function getReviewsRows() {
        return (reviews.map((review, index) => {
            return (
                <tr key={index}>
                    {getReviewRow(review)}
                </tr>
            )
        }))
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Traveled With</th>
                    <th>Review date</th>
                    <th>Travel Date</th>
                    <th>Rating</th>
                    <th>Aspects Rating</th>
                    <th>User</th>
                    <th>Locale</th>
                </tr>
            </thead>
            <tbody>
                {getReviewsRows()}
            </tbody>
        </table>
    );
};

ReviewsTable.propTypes = {
    reviews: PropTypes.array.isRequired
}

export default ReviewsTable;
