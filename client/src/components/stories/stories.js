import React, { Component } from 'react';
import './stories.css';
import Story from '../story/story';
import NewStory from '../newStory/newStory';

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

  publish(title, text, categories) {
    const newStory = {
      title,
      author: this.props.user.username,
      text,
      comments: 0,
      likes: 0,
      categories,
      liked: false,
      disliked: false,
      time: new Date(),
      latitude: this.props.latitude, longitude: this.props.longitude,
    }
    if (newStory.categories.length === 0) {
      newStory.categories.push('untagged');
    }
    this.setState({
      stories: this.state.stories.concat(newStory)
    });
  }

  render() {
    return (
      <div className="Stories">
        <ul id="story-list">
          <NewStory publish={this.publish.bind(this)} />
          {this.state.stories.map((story) =>
            <Story story={story} />
          )}
        </ul>
      </div>
    );
  }
}

export default Stories;
