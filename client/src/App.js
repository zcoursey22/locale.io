import React, { Component } from 'react';
import './App.css';
import Stories from './components/stories/stories';
import Login from './components/login/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">locale.io</h1>
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
