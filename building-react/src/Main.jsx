import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import Building from './Building.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Main extends Component {

  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <Building />
        <div>Write a Post</div>
        <div>Post</div>
        <div>Tags</div>
        <div>Notifications</div>
      </div>
    )
  }
}
