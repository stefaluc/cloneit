import React, { Component } from 'react';

import '../styles/Topic.css';

class Topic extends Component {
  constructor(props) {
    super(props);

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote() {
    this.props.vote(this.props.topic.id, 'up');
  }

  downvote() {
    this.props.vote(this.props.topic.id, 'down');
  }

  render() {
    return (
      <div className="topic">
        <div className="vote">
          <div>{this.props.topic.upvotes}</div>
          <div className="arrow-up" onClick={this.upvote}></div>
          <div className="arrow-down" onClick={this.downvote}></div>
        </div>
        <div className="content">
          {this.props.topic.title}
        </div>
      </div>
    );
  }
}

export default Topic;
