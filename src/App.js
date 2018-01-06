import React from 'react';
 
class App extends React.Component {
  constructor() {
    super();
    this.showAverage = this.showAverage.bind(this);
  }

 async showAverage() {
     let resp = await fetch('http://localhost:3000/calculate-average');
     console.log(await resp.json());
  }
 
  render() {
    return (
      <button onClick={this.showAverage}>
      </button>
    );
  }
}
export default App;