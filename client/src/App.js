import React, { Component } from 'react';

import Topic from './components/Topic';
import SubmitTopic from './components/SubmitTopic';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };

    this.getTopics = async () => {
      const response = await fetch('/api/topics');
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    };

    this.vote = this.vote.bind(this);
    this.submitTopic = this.submitTopic.bind(this);
  }

  componentDidMount() {
    this.getTopics()
      .then(res => this.setState({ topics: res.topics }))
      .catch(err => console.log(err));
  }

  // send HTTP request to upvote or downvote a topic
  async vote(id, type) {
    const response = await fetch(`/api/topics/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ upvotes: (type === 'up') ? 1 : -1 }),
    });

    if (response.status !== 204) {
      console.log('err in PATCH');
    }

    // refresh topic list state
    this.getTopics()
      .then(res => this.setState({ topics: res.topics }))
      .catch(err => console.log(err));
  }

  // send HTTP request to add a new topic
  async submitTopic(title) {
    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response.status !== 200) {
      console.log('err in POST');
    }

    // refresh topic list state
    this.getTopics()
      .then(res => this.setState({ topics: res.topics }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <header>
          <SubmitTopic submitTopic={this.submitTopic} />
        </header>
        <div className="container">
          {this.state.topics.map(topic =>
            (<Topic
              key={topic.id}
              topic={topic}
              vote={this.vote}
            />))}
        </div>
      </div>
    );
  }
}

export default App;
