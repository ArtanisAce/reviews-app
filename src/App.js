import React from "react";
import PropTypes from "prop-types";
import ReviewsTable from "./ReviewsTable";

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			reviews: [],
			filterOption: "",
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
	}

	async componentDidMount() {
		try {
			const resp = await fetch("http://localhost:3000/get-reviews");
			const reviews = await resp.json();
			this.setState({ reviews: this.convertDate(reviews) });
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
		this.setState({ filterOption: "" });
	}

	render() {
		const aspectsAverage = this.state.aspectsAverage;
		const reviews = this.state.filterOption
			? this.state.reviews.filter(
				review => review.traveledWith === this.state.filterOption
			)
			: this.state.reviews;
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

		if (reviews.length === 0) {
			return spinnerWave;
		} else {
			return (
				<div>
					<h1>Accomodation Reviews</h1>
					{traveledWithFilter}
					<ReviewsTable reviews={reviews} />
					<button onClick={this.showAverage}>Show general average</button>
					{this.state.showAverage && <div>{this.state.average}</div>}
					<button onClick={this.showAspectsAverage}>
						Show aspects average
          </button>
					{this.state.showAspectsAverage && (
						<div>
							<ul className="aspects-list">{aspectsList}</ul>
						</div>
					)}
				</div>
			);
		}
	}
}
export default App;
