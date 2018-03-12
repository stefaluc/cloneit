import React, { Component } from 'react';

import '../styles/Topic.css';

class Topic extends Component {
  constructor(props) {
    super(props);

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  // bubble up click to App
  upvote() {
    this.props.vote(this.props.topic.id, 'up');
  }

  // bubble up click to App
  downvote() {
    this.props.vote(this.props.topic.id, 'down');
  }

  render() {
    return (
      <div className="topic">
        <div className="vote">
          <div className="arrow-up" onClick={this.upvote} />
          <div>{this.props.topic.upvotes}</div>
          <div className="arrow-down" onClick={this.downvote} />
        </div>
        <div className="content">
          {this.props.topic.title}
        </div>
      </div>
    );
  }
}

export default Topic;
