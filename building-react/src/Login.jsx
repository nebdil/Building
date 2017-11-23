import React, { Component } from 'react';
import Register from './Register.jsx';
import {
  Link
} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

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
    this._handleAnimation = this._handleAnimation.bind(this)
  }

  componentDidMount() {
    window.addEventListener('load', this._handleAnimation);
  }

  render() {
    return(
{/* <div>
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
    <Link to={'/register'}>Register</Link>
  </form>
</div> */}
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
                    <input type="text" name="email" placeholder="email" onChange={this._handleEmail} />
                    <label htmlFor="password">
                    </label>
                    <input type="text" name="password" placeholder="password" onChange={this._handlePassword} />
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
  _handleAnimation() {
    Array.from(document.getElementsByClassName("start")).forEach((e) => {
      console.log(e)
      e.classList.remove("start")
    })
  }
}
