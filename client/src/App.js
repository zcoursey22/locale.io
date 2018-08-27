import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import config from './config.js';
import Stories from './components/stories/stories';
import Login from './components/login/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {
        email: null,
        username: null,
        password: null
      },
      location: null,
      latitude: null,
      longitude: null,
      locationTemp: ''
    }
  }

  componentWillMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
      location: fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&result_type=locality&key=${config.googleMaps}`)
        .then(res => res.json())
        .then(city => this.setState({
          location: city.results[0].formatted_address
        }));
    }, null, options);
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({users}));

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

  signIn(history) {
    const username = document.querySelector('#log-username');
    const password = document.querySelector('#log-password');
    let complete = true;
    if (username.value === '') {
      username.style.background = '#ffeaea';
      complete = false;
    }
    if (password.value === '') {
      password.style.background = '#ffeaea';
      complete = false;
    }
    if (!complete) {
      return;
    }
    const info = {
      username: username.value,
      password: password.value
    }
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].username === info.username
        && this.state.users[i].password === info.password) {
          this.setState({
            user: this.state.users[i]
          });
          this.props.history.push('/stories');
          return;
        } else if (this.state.users[i].username === info.username) {
          alert('Incorrect password!');
          return;
        }
    }
    alert('User not found!');
  }

  signOut() {
    alert('Logs user out and returns them to the log in page');
    this.setState({
      user: {
        email: null,
        username: null,
        password: null
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">locale.io</h1>
          <div id="user-panel" style={{ display: this.state.user.username ?  'block' : 'none' }}>
            <span id="user">Hello, {this.state.user.username}</span>
            <span id="log-out" onClick={this.signOut.bind(this)}>Sign out</span>
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

        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => <Login signIn={this.signIn.bind(this)} />}/>
            <Route path="/stories" render={(props) => <Stories latitude={this.state.latitude} longitude={this.state.longitude} />}/>
          </Switch>
        </BrowserRouter>

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
