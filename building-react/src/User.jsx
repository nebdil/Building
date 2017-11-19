import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class User extends Component {
  render() {
    return (
      <div>
        <Link to={'/buildings/5/posts'}>Go back</Link>
        <p>Go back</p>
        <p>Edit Profile</p>
        <p>Your posts</p>
        <p>Your commented posts</p>
        <p>Logout</p>
      </div>
    )
  }
}
