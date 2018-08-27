import React, { Component } from 'react';
import './App.css';
import Stories from './components/stories/stories';
import Login from './components/login/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: 'zcoursey22@gmail.com',
        username: 'zcoursey22',
        password: 'pass1'
      },
      location: 'San Francisco, CA'
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">locale.io</h1>
          <div id="user-panel" style={{ display: this.state.user ?  'block' : 'none' }}>
            <span id="user">Hello, {this.state.user.username}</span>
            <span id="location"><img src="images/map.png" />{this.state.location}</span>
          </div>
        </header>

        {/*<Login />*/}
        <Stories />

        <footer className="App-footer">
          <span id="developed-by">Developed by Zach Coursey</span>
          <span id="social-media">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/zcoursey22"><img alt="Link to my Github profile" src="images/github1.png"/></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/zach-coursey/"><img alt="Link to my LinkedIn profile" src="images/linkedin1.png"/></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/zcoursey22"><img alt="Link to my Twitter profile" src="images/twitter1.png"/></a>
          </span>
          <span id="copyright">&copy; Copyright 2018</span>
        </footer>
      </div>
    );
  }
}

export default App;
