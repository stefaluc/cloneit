import React, { Component } from 'react';

import Topic from './components/Topic';
import SubmitTopic from './components/SubmitTopic';
import PageChange from './components/PageChange';
import './styles/App.css';

export const TOPICS_PER_PAGE = 20;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      pageNumber: 0,
    };

    // send HTTP request to get all topics
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
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  // initialize application with topics
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

  // decrement and update page state
  decrementPage() {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  // increment and update page state
  incrementPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  render() {
    const { topics, pageNumber } = this.state;

    // keep track of topic numbers on current page
    const firstTopicOnPage = pageNumber * TOPICS_PER_PAGE;
    // do not let last topic number exceed topics.length
    const temp = (pageNumber * TOPICS_PER_PAGE) + TOPICS_PER_PAGE;
    const lastTopicOnPage = temp > topics.length ? topics.length : temp;

    return (
      <div>
        <header>
          <SubmitTopic submitTopic={this.submitTopic} />
        </header>
        <div className="container">
          <h3>Showing the top {firstTopicOnPage + 1}-{lastTopicOnPage} topics</h3>
          <div className="top-right">
            <PageChange
              pageNumber={pageNumber}
              onDecrement={this.decrementPage}
              onIncrement={this.incrementPage}
              topicsCount={topics.length}
            />
          </div>
          {this.state.topics.slice(firstTopicOnPage, lastTopicOnPage).map(topic =>
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
