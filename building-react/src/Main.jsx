import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
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
        <span>Post</span>
        <span>Tags</span>
        <span>Notifications</span>
      </div>
    )
  }
}
