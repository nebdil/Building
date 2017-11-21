import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this)
  }

  render() {
    return (
      <div>
        <span><Link to={'/buildings/1/users/1'}>My Profile</Link></span>
        <span>Static Building Logo</span>
        <span>Signed in as 1 - in 3601</span>
        <span onClick={this._handleLogout}><Link to={'/logout'}>Log Out</Link></span>
      </div>
    )
  }
  _handleLogout(e) {
    e.preventDefault()
    console.log('LOGOUT LOGOUT LOGOUT')
    console.log(e.target)
    fetch('http://localhost:3000/logout')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.url)
        console.log(this.props.propS)
        console.log(this.props.propS.history)
        this.props.propS.history.push(responseJson.url)
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
