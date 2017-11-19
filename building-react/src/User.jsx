import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUserId: 13,
  //     posts: []
  //   };
  // }
  //
  // componentDidMount() {
  //   return fetch('http://localhost:3000/buildings/1')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({ posts: responseJson })
  //       // console.log(responseJson)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  render() {
    return (
      <div>
        <Link to={'/buildings/1/posts'}>Go back</Link>
        <p>Go back</p>
        <p>Edit Profile</p>
        <p>Your posts</p>
        <p>Your commented posts</p>
        <p>Logout</p>
      </div>
    )
  }
}
