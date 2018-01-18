import React from "react";
import PropTypes from "prop-types";
import ReviewsTable from "./ReviewsTable";

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			reviews: [],
			filterOption: "",
			reviewSortOrder: '', // can be asc or desc (asc = most recent to oldest)
			travelSortOrder: '',
			showAverage: false,
			showAspectsAverage: false,
			average: 0,
			aspectsAverage: {}
		};

		this.showAverage = this.showAverage.bind(this);
		this.showAspectsAverage = this.showAspectsAverage.bind(this);
		this.selectFilterOption = this.selectFilterOption.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
		this.convertDate = this.convertDate.bind(this);
		this.reviewSortAsc = this.reviewSortAsc.bind(this);
		this.reviewSortDesc = this.reviewSortDesc.bind(this);
		this.travelSortAsc = this.travelSortAsc.bind(this);
		this.travelSortDesc = this.travelSortDesc.bind(this);
	}

	async componentDidMount() {
		try {
			const resp = await fetch("http://localhost:3000/get-reviews");
			const reviews = await resp.json();
			this.setState({ reviews });
		} catch (e) {
			return e.message;
		}
	}

	convertDate(reviews) {

		const getDMY = (date) => {
			if (Object.prototype.toString.call(date) === '[object Date]') {
				const month = date.getUTCMonth() + 1;
				const day = date.getUTCDate();
				const year = date.getUTCFullYear();
				return `${day}/${month}/${year}`;
			} else {
				return console.error('No valid Date to convert!');
			}
		}

		return reviews.map((review) => {
			return Object.assign({}, review,
				{ entryDate: getDMY(new Date(review.entryDate)) },
				{ travelDate: getDMY(new Date(review.travelDate)) });
		})
	}

	async showAverage() {
		try {
			const resp = await fetch("http://localhost:3000/general-average");
			const average = await resp.json();
			this.setState({ showAverage: true, average });
		} catch (e) {
			return e.message;
		}
	}

	async showAspectsAverage() {
		try {
			const resp = await fetch("http://localhost:3000/aspects-average");
			const aspectsAverage = await resp.json();
			this.setState({ showAspectsAverage: true, aspectsAverage });
		} catch (e) {
			return e.message;
		}
	}

	selectFilterOption(e) {
		this.setState({ filterOption: e.target.value });
	}

	clearFilter() {
		this.setState({ filterOption: '' });
	}

	reviewSortAsc() {
		this.setState({ reviewSortOrder: 'asc', travelSortOrder: '' });
	}

	reviewSortDesc() {
		this.setState({ reviewSortOrder: 'desc', travelSortOrder: '' });
	}

	travelSortAsc() {
		this.setState({ travelSortOrder: 'asc', reviewSortOrder: '' });
	}

	travelSortDesc() {
		this.setState({ travelSortOrder: 'desc', reviewSortOrder: '' });
	}



	render() {
		const reviewSortOrder = this.state.reviewSortOrder;
		const aspectsAverage = this.state.aspectsAverage;
		let reviews = this.state.filterOption
			? this.state.reviews.filter(
				review => review.traveledWith === this.state.filterOption
			)
			: this.state.reviews;

		// Check for sort order on review submission
		if (this.state.reviewSortOrder === 'asc') {
			const dates = reviews.map(review => review.entryDate);
			const sortedDates = dates.sort((a, b) => b - a);
			reviews = reviews.map((review, index) => Object.assign(review, { entryDate: sortedDates[index] }));
		}

		if (this.state.reviewSortOrder === 'desc') {
			const dates = reviews.map(review => review.entryDate);
			const sortedDates = dates.sort((a, b) => a - b);
			reviews = reviews.map((review, index) => Object.assign(review, { entryDate: sortedDates[index] }));
		}

		// Check for sort order on travel date
		if (this.state.travelSortOrder === 'asc') {
			const dates = reviews.map(review => review.travelDate);
			const sortedDates = dates.sort((a, b) => b - a);
			reviews = reviews.map((review, index) => Object.assign(review, { travelDate: sortedDates[index] }));
		}

		if (this.state.travelSortOrder === 'desc') {
			const dates = reviews.map(review => review.travelDate);
			const sortedDates = dates.sort((a, b) => a - b);
			reviews = reviews.map((review, index) => Object.assign(review, { travelDate: sortedDates[index] }));
		}

		const reviewsConverted = this.convertDate(reviews);

		const aspectsList =
			Object.keys(aspectsAverage).length !== 0
				? Object.keys(aspectsAverage).map((aspect, index) => {
					return (
						<li key={index}>{`${aspect}: ${aspectsAverage[aspect]}`}</li>
					);
				})
				: null;

		const traveledWithFilter = (
			<div className="filter">
				<span>Filter by traveled with...</span>
				<label>
					<input
						type="radio"
						value="FAMILY"
						onChange={this.selectFilterOption}
						checked={this.state.filterOption === "FAMILY"}
					/>
					Family
        </label>
				<label>
					<input
						type="radio"
						value="FRIENDS"
						onChange={this.selectFilterOption}
						checked={this.state.filterOption === "FRIENDS"}
					/>
					Friends
        </label>
				<label>
					<input
						type="radio"
						value="COUPLE"
						onChange={this.selectFilterOption}
						checked={this.state.filterOption === "COUPLE"}
					/>
					Couple
        </label>
				<label>
					<input
						type="radio"
						value="OTHER"
						onChange={this.selectFilterOption}
						checked={this.state.filterOption === "OTHER"}
					/>
					Other
        </label>
				<button onClick={this.clearFilter}>Clear filter</button>
			</div>
		);

		const spinnerWave = (
			<div className="sk-wave">
				<div className="sk-rect sk-rect1" />
				<div className="sk-rect sk-rect2" />
				<div className="sk-rect sk-rect3" />
				<div className="sk-rect sk-rect4" />
				<div className="sk-rect sk-rect5" />
			</div>
		);

		if (reviewsConverted.length === 0) {
			return spinnerWave;
		} else {
			return (
				<div>
					<h1>Accomodation Reviews</h1>
					{traveledWithFilter}
					<button onClick={this.reviewSortAsc}>
						Sort by review date asc
					</button>
					<button onClick={this.reviewSortDesc}>
						Sort by review date desc
					</button>
					<button onClick={this.travelSortAsc}>
						Sort by travel date desc
					</button>
					<button onClick={this.travelSortDesc}>
						Sort by travel date desc
					</button>
					<ReviewsTable reviews={reviewsConverted} />
					<button onClick={this.showAverage}>Show general average</button>
					{this.state.showAverage && <div className="general-average">{this.state.average}</div>}
					<button onClick={this.showAspectsAverage}>
						Show aspects average
          </button>
					{this.state.showAspectsAverage && (
						<ul className="aspects-list">{aspectsList}</ul>
					)}
				</div>
			);
		}
	}
}
export default App;
