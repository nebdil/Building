import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


export default class Navbar extends Component {

  render() {
    return (
      <div>
        <span><Link to={'/buildings/5/users/13'}>My Profile</Link></span>
        <span>Static Building Logo</span>
        <span>Signed in as 1 - in 3601</span>
        <span><Link to={'/logout'}>Log Out</Link></span>
      </div>
    )
  }
}
