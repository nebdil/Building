import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import CreatePost from './CreatePost.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 13,
      posts: []
    };
  }
  componentDidMount() {
    return fetch('http://localhost:3000/buildings/5/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidUpdate() {
    return fetch('http://localhost:3000/buildings/5')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <CreatePost currentPosts = {this.state.posts}/>
        <Tag posts={this.state.posts}/>
        {this.state.posts.map(function(e) {
          return <Post currentPosts = {e} key = {e.id} />
        })}
      </div>
    )
  }

}
