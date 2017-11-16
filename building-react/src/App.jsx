import React, { Component } from 'react';
import Building from './Building.jsx';
import User from './User.jsx';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentDidMount() {
    fetch('http://localhost:3000')
    .then(results => {
      let resJson = results.json();
      this.setState({posts: resJson});
      console.log(resJson)
    })

  }

  render() {
    const postS = this.state.posts
    console.log(postS)
    return (
      <div> {postS} </div>
    )
  }
}
