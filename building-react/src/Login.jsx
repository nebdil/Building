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
    this._handleLogin = this._handleLogin.bind(this)
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
          <Link to={'/buildings'}>Register</Link>
        </form>
      </div>
    )
  }
  _handleLogin(e) {
    e.preventDefault()
    console.log('======================')
    console.log(e.target)
    const data = new FormData(e.target);
    fetch('/login', {
      method: 'POST',
      body: data
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson.url)
      // console.log(this.props)
      // console.log(this.history)
      this.props.history.push(responseJson.url)
      // if (responseJson.url <= 6) {
      //   this.setState({loggedIn: false})
      // } else {
      //   this.setState({loggedIn: true})
      // }
    })
  }
  _handleChange(e) {
    // console.log('in hangle change' + e.target.value)
    console.log('in hangle change')
    // console.log(this.props)
  }
}
