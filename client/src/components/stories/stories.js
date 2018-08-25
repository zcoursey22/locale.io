import React, { Component } from 'react';
import './stories.css';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    fetch('/api/stories')
      .then(res => res.json())
      .then(stories => this.setState({stories}));
  }

  render() {
    return (
      <div className="Stories">
        <ul id="story-list">
          {this.state.stories.map((story) =>
            <li>
              <h2 id="title">{story.title}</h2>
              <h3 id="author">by <span id="author-name">{story.author}</span></h3>
              <p>
                <span id="likes">{story.likes} likes</span>
                <span id="comments">{story.comments} comments</span>
              </p>
              <p id="text">{story.text}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Stories;
