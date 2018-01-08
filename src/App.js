import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor() {
    super();
    this.showAverage = this
      .showAverage
      .bind(this);
  }

  async showAverage() {
    let resp = await fetch('http://localhost:3000/general-average');
    console.log(await resp.json());
  }

  async showAspectsAverage() {
    let resp = await fetch('http://localhost:3000/aspects-average');
    console.log(await resp.json());
  }

  render() {
    return (
      <div>
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