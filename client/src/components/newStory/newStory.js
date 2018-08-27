import React, { Component } from 'react';
import autosize from 'autosize';
import './newStory.css';

class NewStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      categories: []
    };
  }

  categoryBackground(category) {
    const categories = {
      alert: '#e77',
      business: '#69f',
      traffic: '#fc6',
      recreation: '#7b7',
      gossip: '#b9f'
    }
    return categories[category];
  }

  selectCategory(category) {
    let alreadyIncluded = false;
    for (var i = 0; i < this.state.categories.length; i++) {
      if (category.innerText.toLowerCase() === this.state.categories[i]) {
        alreadyIncluded = true;
      }
    }
    if (alreadyIncluded) {
      const newCategories = Array.from(this.state.categories);
      newCategories.splice(newCategories.indexOf(category.innerText.toLowerCase()), 1);
      category.style.filter = 'saturate(0)';
      this.setState({
        categories: newCategories
      })
    } else {
      category.style.filter = 'saturate(1)';
      this.setState({
        categories: this.state.categories.concat(category.innerText.toLowerCase())
      });
    }
  }

  resizeTextarea() {
    const text = document.querySelector('#newText');
    if (text.innerText.length % 5 === 0) {
      autosize(text);
    }
    this.setText();
  }

  setTitle() {
    this.setState({
      title: document.querySelector('#newTitle').value
    });
  }

  setText() {
    this.setState({
      text: document.querySelector('#newText').value
    });
  }

  publishStory() {
    const title = this.state.title;
    const text = this.state.text;
    const categories = this.state.categories;
    document.querySelector('#newTitle').value = '';
    document.querySelector('#newText').value = '';
    document.querySelectorAll('.newCategory').forEach(button => {
      button.style.filter = 'saturate(0)';
    });
    this.setState({
      categories: []
    });
    return this.props.publish(title, text, categories);
  }

  render() {
    const categoryNames = ['alert', 'business', 'traffic', 'recreation', 'gossip'];
    return (
      <li className="newStory">
        <input id="newTitle" placeholder="Title" onChange={this.setTitle.bind(this)}></input>
        <textarea id="newText" onChange={this.resizeTextarea.bind(this)} placeholder=""></textarea>
        <span>
          Categories:&nbsp;
          {categoryNames.map((category) =>
            <button className="newCategory" onClick={(e) => this.selectCategory.call(this, e.target)} style={{ background: this.categoryBackground(category) }}>{category.toUpperCase()}</button>
          )}
        </span>
        <button id="publish" onClick={this.publishStory.bind(this)}>Publish</button>
      </li>
    );
  }
}

export default NewStory;
