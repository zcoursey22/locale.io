import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      signUp: false
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({users}));
  }

  showSignUp() {
    this.setState({
      signUp: true
    });
  }

  render() {
    return (
      <div className="Login">
        <div id="container">
          <h2>Welcome to <span>locale.io</span></h2>
          <div id="forms">
            <form style={{ flexBasis: this.state.signUp ? '25%' : '100%', padding: this.state.signUp ? '15px 3vw' : '15px 8vw' }} id="login-form">
              <input placeholder="Username"></input>
              <input placeholder="Password"></input>
              <button type="submit">Log In</button>
              <p onClick={this.showSignUp.bind(this)}>Don't have an account?<br />Sign up!</p>
            </form>
            <form id="sign-up-form" className={this.state.signUp ? 'expanded' : ''}>
              <input placeholder="Email"></input>
              <input placeholder="Username"></input>
              <input placeholder="Password"></input>
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
