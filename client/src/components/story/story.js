import React, { Component } from 'react';
import moment from 'moment';
import './story.css';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: props.story,
      expanded: false,
      liked: props.story.liked,
      disliked: props.story.disliked,
    };
  }

  categoryBackground(category) {
    const categories = {
      alert: '#e77',
      business: '#69f',
      traffic: '#fc6',
      recreation: '#7b7',
      other: '#b9f'
    }
    return categories[category];
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  like() {
    if (this.state.disliked) {
      this.setState({
        disliked: false
      });
    }
    this.setState({
      liked: !this.state.liked
    });
  }

  dislike() {
    if (this.state.liked) {
      this.setState({
        liked: false
      });
    }
    this.setState({
      disliked: !this.state.disliked
    });
  }

  render() {
    const story = this.state.story;
    return (
      <li className="story">
        <span id="date-time">
          <p id="date">
            {moment(story.time).format('MMM D, YYYY')}
          </p>
          <p id="time">
            {moment(story.time).format('h:mm a')}
          </p>
        </span>
        <h2 id="title">{story.title}</h2>
        <h3 id="author">by <span id="author-name" onClick={() => alert('links to author\'s public profile')}>{story.author}</span></h3>
        <p>
          <span id="likes" onClick={() => alert('displays likes for stories')}>{story.likes} likes</span>
          <span id="comments" onClick={() => alert('displays comments for stories')}>{story.comments} comments</span>
        </p>
        <p id="text" style={{ maxHeight: this.state.expanded ? '120px' : '15px' }}>{story.text}</p>
        <span id="liked" onClick={this.like.bind(this)} style={{ color: this.state.liked ? '#7b7' : '#ccc'}}>
          LIKE
        </span>
        <span id="disliked" onClick={this.dislike.bind(this)} style={{ color: this.state.disliked ? '#e77' : '#ccc'}}>
          DISLIKE
        </span>
        <span>
          {story.categories.map((category) =>
            <button className="category" onClick={() => alert('shows only stories that include the clicked category')} style={{ background: this.categoryBackground(category) }}>{category.toUpperCase()}</button>
          )}
        </span>
        <img id="expand" onClick={this.toggleExpanded.bind(this)} src={this.state.expanded ? 'images/up-arrow1.png' : 'images/down-arrow1.png'}/>
      </li>
    );
  }
}

export default Story;
