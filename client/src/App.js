import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: {},
    };

    this.getTopics = async () => {
      const response = await fetch('/api/topics');
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    };
  }

  componentDidMount() {
    this.getTopics()
      .then(res => this.setState({ topics: res.topics }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.topics);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
