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
                      Hi,
                    </span>
                    <span className="intro-text-3 start">
                      welcome back!
                    </span>
                    <span className="intro-text-4 start">
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
                    <input type="password" name="password" placeholder="password" onChange={this._handlePassword} />
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
    // console.log(e.target)
    // console.log(localStorage.getItem('user_username'))
    // const data = new FormData(e.target);
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
    console.log(obj.auth.email)
    // console.log(data["email"])
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson in login posting to login: ')
      console.log(responseJson)
      localStorage.setItem('user_username', responseJson.user.username);
      localStorage.setItem('user_email', responseJson.user.email);
      localStorage.setItem('building_id', responseJson.building.id);
      localStorage.setItem('building_address', responseJson.building.address);
      localStorage.setItem('user_id', responseJson.user.id);
      // console.log(localStorage.getItem('user_id'))
      // console.log(localStorage.getItem('building_id'))
      // console.log(localStorage.getItem('building_address'))
      // console.log(localStorage.getItem('user_username'))
      // console.log(localStorage.getItem('user_email'))
    })
    .then(() => {
      fetch('/user_token', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson in login posting to user token: ' + responseJson)
        localStorage.setItem('user_token', responseJson.jwt);
        // console.log(localStorage.getItem('user_token'))
        // console.log(localStorage)
        // console.log(localStorage.getItem('user_email'))
        // console.log(this.props)
        // console.log(this.history)
        // this.props.history.push(responseJson.url)
        this.props.history.push(`/buildings/${localStorage.getItem('building_id')}/posts`)
        // if (responseJson.url <= 6) {
        //   this.setState({loggedIn: false})
        // } else {
        //   this.setState({loggedIn: true})
        // }
      })
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
