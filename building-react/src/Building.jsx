import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  componentDidMount() {
    return fetch('http://localhost:3000/buildings/1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson })
        // console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <Tag posts={this.state.posts}/>
        {this.state.posts.map(function(e) {
          return <Post currentPosts = {e} key = {e.id} />
        })}
      </div>
    )
  }
}
