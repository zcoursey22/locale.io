import React, { Component } from 'react';
import autosize from 'autosize';
import './newStory.css';

class NewStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
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
  }

  render() {
    const categoryNames = ['alert', 'business', 'traffic', 'recreation', 'other'];
    return (
      <li className="newStory">
        <input id="newTitle" placeholder="Title"></input>
        <textarea id="newText" onChange={this.resizeTextarea.bind(this)} placeholder="Text"></textarea>
        <span>
          {categoryNames.map((category) =>
            <button className="newCategory" onClick={(e) => this.selectCategory.call(this, e.target)} style={{ background: this.categoryBackground(category) }}>{category.toUpperCase()}</button>
          )}
        </span>
      </li>
    );
  }
}

export default NewStory;
