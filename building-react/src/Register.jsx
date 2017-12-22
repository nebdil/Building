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
      address: '',
      building_id: ''
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
    this.forceUpdate = this.forceUpdate.bind(this)
  }

  componentDidMount() {
    console.log('in omponent did mount')
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
                <h1 id="logo-header">BUILDING</h1>
                <hr />
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
                        interact with your neighbors
                      </span>
                      <span className="intro-text-4 start" id="below">
                        by registering below...
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
                    <input type="password" name="password" placeholder="password" onChange={this._handlePassword} />

                    <label htmlFor="password_confirmation">
                    </label>
                    <input type="password" name="password_confirmation" placeholder="confirm password" onChange={this._handlePasswordConfirmation} />
                    <BuildingRegister initAutocomplete={this.initAutocomplete}/>
                    <p className="email">You will receive an email once you register!</p>
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
    let data = {
      address: this.state.address,
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
    e.preventDefault()
    console.log('in handle register')
    console.log(data)
    fetch('/buildings', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
      'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      localStorage.setItem('user_id', responseJson.id)
      localStorage.setItem('building_id', responseJson.building_id)
      localStorage.setItem('user_username', responseJson.username)
      localStorage.setItem('user_email', responseJson.email)
      localStorage.setItem('building_address', this.state.address)
      // gets the newly created / signed in building id and stores it in the state
      this.setState({building_id: responseJson.building_id})
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
        console.log('in fetch user token')
        console.log(responseJson)
        // get the authorization user token and store it in the local storage
        localStorage.setItem('user_token', responseJson.jwt);
        // this.props.history.push(`/buildings/${localStorage.getItem('building_id')}/posts`)

        // get the building id to redirect to the building's page
        this.props.history.push(`/buildings/${this.state.building_id}/posts`)
      })
    })
  }
  _handleChange(e) {
    console.log('in hangle change')
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
