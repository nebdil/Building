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
      building_id: ''
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
              <h1 id="logo-header">BUILDING</h1>
              <hr />
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
                      welcome back!
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
    let obj = {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('in login:', responseJson)
      // gets the signed in building id and stores it in the state
      this.setState({building_id: responseJson})
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
        console.log(responseJson)
        localStorage.setItem('user_token', responseJson.jwt);

        // get the building id to redirect to the building's page
        this.props.history.push(`/buildings/${this.state.building_id}/posts`)
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
