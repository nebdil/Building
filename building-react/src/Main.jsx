import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import Building from './Building.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CreatePost from './CreatePost.jsx';

export default class Main extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <CreatePost />
        <Building />
        <span>Post</span>
        <span>Tags</span>
        <span>Notifications</span>
      </div>
    )
  }
}
