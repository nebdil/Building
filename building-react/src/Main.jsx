import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Main extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <span>Write a Post</span>
        <span>Post</span>
        <span>Tags</span>
        <span>Notifications</span>
      </div>
    )
  }
}
