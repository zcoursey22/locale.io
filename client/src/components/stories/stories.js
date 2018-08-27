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

  componentWillReceiveProps() {
    fetch('/api/stories')
      .then(res => res.json())
      .then(stories => {
        const closeStories = [];
        stories.forEach(story => {
          if (Math.abs(story.latitude - this.props.latitude) <= 0.3 && Math.abs(story.longitude - this.props.longitude) <= 0.3) {
            closeStories.push(story);
          }
        });
        this.setState({
          stories: closeStories
        });
      });
  }

  componentDidMount() {
    if (this.props.user.username === null) {
      this.props.history.push('/');
    }
    fetch('/api/stories')
      .then(res => res.json())
      .then(stories => {
        const closeStories = [];
        stories.forEach(story => {
          if (Math.abs(story.latitude - this.props.latitude) <= 0.3 && Math.abs(story.longitude - this.props.longitude) <= 0.3) {
            closeStories.push(story);
          }
        });
        this.setState({
          stories: closeStories
        });
      });
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
