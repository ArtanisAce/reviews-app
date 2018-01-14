import React from "react";
import PropTypes from "prop-types";
import ReviewsTable from "./ReviewsTable";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      reviews: [],
      showAverage: false,
      showAspectsAverage: false,
      average: 0,
      aspectsAverage: {}
    };

    this.showAverage = this.showAverage.bind(this);
    this.showAspectsAverage = this.showAspectsAverage.bind(this);
  }

  async componentDidMount() {
    const resp = await fetch("http://localhost:3000/get-reviews");
    const reviews = await resp.json();
    this.setState({ reviews });
  }

  async showAverage() {
    const resp = await fetch("http://localhost:3000/general-average");
    const average = await resp.json();
    this.setState({ showAverage: true, average });
  }

  async showAspectsAverage() {
    const resp = await fetch("http://localhost:3000/aspects-average");
    const aspectsAverage = await resp.json();
    this.setState({ showAspectsAverage: true, aspectsAverage });
  }

  render() {
    const aspectsAverage = this.state.aspectsAverage;
    const aspectsList =
      Object.keys(aspectsAverage).length !== 0
        ? Object.keys(aspectsAverage).map((aspect, index) => {
            return (
              <li key={index}>{`${aspect}: ${aspectsAverage[aspect]}`}</li>
            );
          })
        : null;

    return (
      <div>
        <h1>Accomodation Reviews</h1>
        <ReviewsTable reviews={this.state.reviews} />
        <button onClick={this.showAverage}>Show general average</button>
        {this.state.showAverage && <div>{this.state.average}</div>}
        <button onClick={this.showAspectsAverage}>Show aspects average</button>
        {this.state.showAspectsAverage && (
          <div>
            <ul className="aspects-list">{aspectsList}</ul>
          </div>
        )}
      </div>
    );
  }
}
export default App;
