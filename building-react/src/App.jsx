import React, { Component } from 'react';
import Building from './Building.jsx';
import User from './User.jsx';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Navbar from './Navbar.jsx';
import Main from './Main.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CreatePost from './CreatePost.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      posts: []
    };

  }
  //
  // componentDidMount() {
  //   return fetch('http://localhost:3000/buildings/1/posts')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({ posts: responseJson })
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
  // _handleNewPost(e) {
  //   e.preventDefault();
  //   const content = new FormData(e.target);
  //   console.log(content)
  // }
  // _handleChange(e) {
  //   console.log('in hangle change' + e.target.value)
  // }
}
