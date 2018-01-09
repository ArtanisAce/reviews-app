import React from 'react';
import PropTypes from 'prop-types';
import ReviewsTable from './ReviewsTable';

class App extends React.Component {
  constructor() {
    super();

    this.state = {reviews: []};

    this.showAverage = this
      .showAverage
      .bind(this);
  }

  async componentDidMount() {
    const resp = await fetch('http://localhost:3000/get-reviews');
    const reviews = await resp.json(); 
    console.log(reviews);
    this.setState({reviews});
  }

  async showAverage() {
    const resp = await fetch('http://localhost:3000/general-average');
    console.log(await resp.json());
  }

  async showAspectsAverage() {
    const resp = await fetch('http://localhost:3000/aspects-average');
    console.log(await resp.json());
  }

  render() {
    return (
      <div>
        <ReviewsTable reviews={this.state.reviews}/>
        <button onClick={this.showAverage}>
          Show general averages
        </button>
        <button onClick={this.showAspectsAverage}>
          Show aspects average
        </button>
      </div>
    );
  }
}
export default App;