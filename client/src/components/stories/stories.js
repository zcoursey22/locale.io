import React, { Component } from 'react';
import './stories.css';
import Story from '../story/story';
import NewStory from '../newStory/newStory';
import axios from 'axios';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/api/stories')
    .then(stories => {
      const formattedStories = stories.data.map(story => {
        return {
          title: story.title,
          text: story.text,
          time: story.time,
          likes: 0,
          comments: 0,
          latitude: Number(story.latitude),
          longitude: Number(story.longitude),
          categories: JSON.parse(story.categories),
          author: story.username
        };
      });
      this.setState({
        stories: formattedStories
      });
    });
  }

  componentDidMount() {
    if (this.props.user.username === null) {
      this.props.history.push('/');
    }
    axios.get('/api/stories')
      .then(stories => {
        const formattedStories = stories.data.map(story => {
          return {
            title: story.title,
            text: story.text,
            time: story.time,
            likes: 0,
            comments: 0,
            latitude: Number(story.latitude),
            longitude: Number(story.longitude),
            categories: JSON.parse(story.categories),
            author: story.username
          };
        });
        this.setState({
          stories: formattedStories
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
      latitude: Number(this.props.latitude.toFixed(3)),
      longitude: Number(this.props.longitude.toFixed(3)),
    }
    if (newStory.categories.length === 0) {
      newStory.categories.push('untagged');
    }
    axios.post('/api/stories', newStory)
      .then(res => newStory);
      window.location.reload();
  }

  render() {
    return (
      <div className="Stories">
        <ul id="story-list">
          <NewStory publish={this.publish.bind(this)} />
          {this.state.stories.sort((a,b) => Date.parse(b.time) - Date.parse(a.time)).map((story) =>
            <Story story={story} />
          )}
        </ul>
      </div>
    );
  }
}

export default Stories;
