import React, { Component } from 'react';
import BuildingRegister from './BuildingRegister.jsx'
import { Grid, Row, Col } from 'react-bootstrap'
import {
  Link
} from 'react-router-dom'
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      url: '',
      address: ''
    }
    this._handleChange = this._handleChange.bind(this)
    this._handleRegister = this._handleRegister.bind(this)
    // this.setState = this.setState.bind(this)
    this._handleEmail = this._handleEmail.bind(this)
    this._handleUsername = this._handleUsername.bind(this)
    this._handlePassword = this._handlePassword.bind(this)
    this._handlePasswordConfirmation = this._handlePasswordConfirmation.bind(this)
    this._handleAnimation = this._handleAnimation.bind(this)
    this.initAutocomplete = this.initAutocomplete.bind(this)
  }

  componentDidMount() {
    window.addEventListener('load', this._handleAnimation);
  }

  render() {
    return(
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <div className="background-image"></div>
            </Col>
            <Col md={4}>
              <div className="register-div">
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
              </div>
              <div id="screen">
                <div className="register-container">
                  <form className="register-form" onSubmit={this._handleRegister}>
                    <label htmlFor="email">
                    </label>
                    <input type="text" name="email" placeholder="email" onChange={this._handleEmail} />

                    <label htmlFor="username">
                    </label>
                    <input type="text" name="username" placeholder="username" onChange={this._handleUsername} />

                    <label htmlFor="password">
                    </label>
                    <input type="text" name="password" placeholder="password" onChange={this._handlePassword} />

                    <label htmlFor="password_confirmation">
                    </label>
                    <input type="text" name="password_confirmation" placeholder="confirm password" onChange={this._handlePasswordConfirmation} />
                    <BuildingRegister initAutocomplete={this.initAutocomplete}/>
                    <button>Register</button>
                    <hr />
                    <Link to={'/login'}>Login</Link>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
  _handleRegister(e) {
    e.preventDefault()
    fetch('/buildings', {
      method: 'POST',
      body: this.state.address,
      headers: {
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('rispons ceycon', responseJson);
    })

    //PICKUP FROM HERE!!!!!!!!!!!!!!!!!!

    const obj = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }
    const obj1 = {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    }
    console.log(obj)
    console.log('REGISTER REGISTER REGISTER')
    console.log(e.target)
    // const data = new FormData(e.target);
    // console.log('data: ' + data)
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({url: responseJson.url})
    })
    .then(() => {
      fetch('/user_token', {
        method: 'POST',
        body: JSON.stringify(obj1),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        localStorage.setItem('user_token', responseJson.jwt);
        console.log(localStorage.getItem('user_token'))
        this.props.history.push(this.state.url)
      })
    })


  }

  _handleChange(e) {
    console.log('in hangle change' + e.target.value)
    // console.log('in hangle change')
    // console.log(this.props)
  }
  _handleEmail(e) {
    console.log(e.target.value)
    this.setState({email: e.target.value})
  }
  _handleUsername(e) {
    console.log(e.target.value)
    this.setState({username: e.target.value})
  }
  _handlePassword(e) {
    console.log(e.target.value)
    this.setState({password: e.target.value})
  }
  _handlePasswordConfirmation(e) {
    console.log(e.target.value)
    this.setState({password_confirmation: e.target.value})
  }

  _handleAnimation() {
    Array.from(document.getElementsByClassName("start")).forEach((e) => {
      console.log(e)
      e.classList.remove("start")
    })
  }

  initAutocomplete() {
    const that = this
    const input = document.getElementById('pac-input');
    const searchBox = new window.google.maps.places.SearchBox(input);
    searchBox.addListener('places_changed', function() {
      const places = searchBox.getPlaces()
      if (places.length == 0) {
        return;
      }
      that.setState({address: places[0].formatted_address});
      console.log(that.state.address);
    });
  }
}
