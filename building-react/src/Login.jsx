import React, { Component } from 'react';
import Register from './Register.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class Login extends Component {
  constructor({props, history}) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: ''
    }
    this._handleEmail = this._handleEmail.bind(this)
    this._handlePassword = this._handlePassword.bind(this)
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
          <input type="text" name="email" placeholder="Your email" onChange={this._handleEmail} />
          <label htmlFor="password">
            Password:
          </label>
          <input type="text" name="password" placeholder="Your password" onChange={this._handlePassword} />
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
    // console.log(data.keys())
    // for (let key in data.keys()) {
    //   console.log(key)
    //   console.log(FormData[key].value)
    // }
    let obj = {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    }
    console.log(data["email"])
    fetch('/user_token', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      localStorage.setItem('user_token', responseJson.jwt);
      console.log(localStorage.getItem('user_token'))
      // console.log(this.props)
      // console.log(this.history)
      // this.props.history.push(responseJson.url)
      this.props.history.push('/buildings/1/posts')
      // if (responseJson.url <= 6) {
      //   this.setState({loggedIn: false})
      // } else {
      //   this.setState({loggedIn: true})
      // }
    })
  }
  _handleEmail(e) {
    // console.log('in hangle change' + e.target.value)
    console.log('in hangle change')
    this.setState({email: e.target.value})
    // console.log(this.props)
  }
  _handlePassword(e) {
    // console.log('in hangle change' + e.target.value)
    console.log('in hangle change')
    this.setState({password: e.target.value})
    // console.log(this.props)
  }
}
