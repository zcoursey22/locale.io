import React, { Component } from 'react';
import './stories.css';
import Story from '../story/story'

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
            <Story story={story} />
          )}
        </ul>
      </div>
    );
  }
}

export default Stories;
