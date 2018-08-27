import React, { Component } from 'react';
import './App.css';
import config from './config.js';
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
      location: null,
      locationTemp: ''
    }
  }

  componentDidMount() {
    const fetching = setInterval(() => {
      if (this.state.location !== null) {
        clearInterval(fetching);
      }
      if (this.state.locationTemp === '...') {
        this.setState({
          locationTemp: ''
        });
      } else {
        this.setState({
          locationTemp: this.state.locationTemp + '.'
        });
      }
    }, 300);
  }

  componentWillMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((pos) => {
      location: fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&result_type=locality&key=${config.googleMaps}`)
        .then(res => res.json())
        .then(city => this.setState({
          location: city.results[0].formatted_address
        }));
    }, null, options);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">locale.io</h1>
          <div id="user-panel" style={{ display: this.state.user ?  'block' : 'none' }}>
            <span id="user">Hello, {this.state.user.username}</span>
            <span id="log-out" onClick={() => alert('Logs user out and returns them to the log in page')}>Sign out</span>
            <div id="location" style={{ maxWidth: this.state.location ? '300px' : '130px'}}>
              <span>
                <img src="images/map.png" />
                {this.state.location ? this.state.location : 'Locating you'}
                <span id="loading" style={{ display: this.state.location ? 'none' : 'inline'}}>
                  {this.state.locationTemp}
                </span>
              </span>
            </div>
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
