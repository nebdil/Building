import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Navbar extends Component {

  render() {
    return (
      <div>
        <span><Link to={`buildings/${building_id}/users/${id}}`}>My Profile</Link></span>
        <span>Static Building Logo</span>
        <span>Signed in as Emmi - in 3601</span>
        <span><Link to={'/logout'}>Log Out</Link></span>
      </div>
    )
  }
}
