import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // street_no: '',
      // street_name: '',
      // city: '',
      // province: '',
      // postal_code: '',
      // country: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
    this._handleChange = this._handleChange.bind(this)
    // this._handleStreetNo = this._handleStreetNo.bind(this)
    // this._handleStreetName = this._handleStreetName.bind(this)
    // this._handleCity = this._handleCity.bind(this)
    // this._handleProvince = this._handleProvince.bind(this)
    // this._handleCountry = this._handleCountry.bind(this)
    // this._handlePostalCode = this._handlePostalCode.bind(this)
    this._handleRegister = this._handleRegister.bind(this)
    this.setState = this.setState.bind(this)
    this._handleEmail = this._handleEmail.bind(this)
    this._handleUsername = this._handleUsername.bind(this)
    this._handlePassword = this._handlePassword.bind(this)
    this._handlePasswordConfirmation = this._handlePasswordConfirmation.bind(this)
    this._handleAnimation = this._handleAnimation.bind(this)
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
                  <form onSubmit={this._handleRegister}>
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
                    <button>Register</button>
                    <hr />
                    <Link to={'/login'}>Login</Link>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
        {/* <form>
          <label htmlFor="street_no">
            Street Number:
          </label>
          <input type="text" name="street_no" placeholder="Street Number" onChange={this._handleStreetNo} />
          <label htmlFor="street_name">
            Street Name:
          </label>
          <input type="text" name="street_name" placeholder="Street Name" onChange={this._handleStreetName} />
          <label htmlFor="city">
            City:
          </label>
          <input type="text" name="city" placeholder="City" onChange={this._handleCity} />
          <label htmlFor="province">
            Province:
          </label>
          <input type="text" name="province" placeholder="Province" onChange={this._handleProvince} />
          <label htmlFor="country">
            Country:
          </label>
          <input type="text" name="country" placeholder="Country" onChange={this._handleCountry} />
          <label htmlFor="postal_code">
            Postal Code:
          </label>
          <input type="text" name="postal_code" placeholder="Postal Code" onChange={this._handlePostalCode} />
          <button>Send Building!</button>
        </form> */}

        {/* <form onSubmit={this._handleRegister}>
          <label htmlFor="email">
            Email:
          </label>
          <input type="text" name="email" placeholder="Your email" onChange={this._handleEmail} />

          <label htmlFor="username">
            Username:
          </label>
          <input type="text" name="username" placeholder="Your username" onChange={this._handleUsername} />

          <label htmlFor="password">
            Password:
          </label>
          <input type="text" name="password" placeholder="Your password" onChange={this._handlePassword} />

          <label htmlFor="password_confirmation">
            Password Confirmation:
          </label>
          <input type="text" name="password_confirmation" placeholder="Your password again" onChange={this._handlePasswordConfirmation} />
          <button>Register!</button>
        </form> */}
        {/* {if (flash[:notice]) {
          <div>{flash[:notice]}</div>
        }} */}
      </div>
    )
  }
  _handleRegister(e) {
    const obj = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }
    console.log(obj)
    e.preventDefault()
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
      this.props.history.push(responseJson.url)
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
  // _handleStreetNo(e) {
  //   console.log(e.target.value)
  //   this.setState({street_no: e.target.value.replace(/\s/g, '').toLowerCase()})
  // }
  // _handleStreetName(e) {
  //   console.log(e.target.value)
  //   this.setState({street_name: e.target.value.replace(/\s/g, '').toLowerCase()})
  // }
  // _handleCity(e) {
  //   console.log(e.target.value)
  //   this.setState({city: e.target.value.replace(/\s/g, '').toLowerCase()})
  // }
  // _handleProvince(e) {
  //   console.log(e.target.value)
  //   this.setState({province: e.target.value.replace(/\s/g, '').toLowerCase()})
  // }
  // _handleCountry(e) {
  //   console.log(e.target.value)
  //   this.setState({country: e.target.value.replace(/\s/g, '').toLowerCase()})
  // }
  // _handlePostalCode(e) {
  //   console.log(e.target.value.replace(/\s/g, '').toLowerCase())
  //   this.setState({postal_code: e.target.value.replace(/\s/g, '').toLowerCase()})
  // }
  _handleAnimation() {
    Array.from(document.getElementsByClassName("start")).forEach((e) => {
      console.log(e)
      e.classList.remove("start")
    })
  }
}
