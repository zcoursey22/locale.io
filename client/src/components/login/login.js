import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false
    };
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
          <div id="forms" style={{ display: this.props.user.username === null ? 'block' : 'none'}}>
            <form style={{ flexBasis: this.state.signUp ? '25%' : '100%', padding: this.state.signUp ? '15px 3vw' : '15px 8vw' }} id="login-form">
              <input id="log-username" placeholder="Username" onClick={(e) => e.target.style.background = 'white'}></input>
              <input id="log-password" placeholder="Password" onClick={(e) => e.target.style.background = 'white'}></input>
              <button type="button" onClick={this.props.signIn}>Log In</button>
              <p onClick={this.showSignUp.bind(this)}>Don't have an account?<br />Sign up!</p>
            </form>
            <form id="sign-up-form" className={this.state.signUp ? 'expanded' : ''}>
              <input placeholder="Email"></input>
              <input placeholder="Username"></input>
              <input placeholder="Password"></input>
              <button type="button">Join</button>
            </form>
          </div>
          <div id="already-logged-in" style={{ display: this.props.user.username === null ? 'none' : 'block'}}>
            <div><Link to="/stories">Return to your feed!</Link></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
