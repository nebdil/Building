import React, { Component } from 'react';
import Register from './Register.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this)
    this._handleLogin = this._handleLogin.bind(this)
    this._handleAnimation = this._handleAnimation.bind(this)
  }

  componentDidMount() {
    window.addEventListener('load', this._handleAnimation);
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col md={8}>
            <div className="background-image">

            </div>

          </Col>
          <Col md={4}>
            <div className="login-div">
              <div className="intro-text-wrapper">
                <div className="intro-text-container">
                  <h1>
                    <span className="intro-text-1 start">
                      👋
                    </span>
                    <span className="intro-text-2 start">
                      Hi
                    </span>
                    <span className="intro-text-3 start">
                      ,
                    </span>
                    <span className="intro-text-4 start">
                      welcome to Building!
                    </span>
                  </h1>
                </div>
              </div>
              <div id="screen">
                <div className="login-container">
                  <form  className="login-form" onSubmit={this._handleLogin}>
                    <label htmlFor="email">
                    </label>
                    <input type="text" name="email" placeholder="email" onChange={this._handleChange} />
                    <label htmlFor="password">
                    </label>
                    <input type="text" name="password" placeholder="password" onChange={this._handleChange} />
                    <button>Login</button>
                    <hr/>
                    <Link to={'/register'}>Register</Link>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
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
  _handleAnimation() {
    Array.from(document.getElementsByClassName("start")).forEach((e) => {
      console.log(e)
      e.classList.remove("start")
    })
  }
}
