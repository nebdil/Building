import React, { Component } from 'react';
import Register from './Register.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this)
  }

  render() {
    return(
      <div>
        <h1>BUILDING(COMMUNITIES)</h1>
        <p>ABOUT</p>

        <form onSubmit={this._handleLogin}>
          <label htmlFor="email">
            Email:
          </label>
          <input type="text" name="email" placeholder="Your email" onChange={this._handleChange} />
          <label htmlFor="password">
            Password:
          </label>
          <input type="text" name="password" placeholder="Your password" onChange={this._handleChange} />
          <button>Login!</button>
        </form>
      </div>
    )
  }
  _handleLogin(e) {
    console.log(e.target)
    const data = new FormData(e.target);
    fetch('/login', {
      method: 'POST',
      body: data
    })
  }
  _handleChange(e) {
    console.log('in hangle change' + e.target.value)
  }
}
