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
      currentUserId: 1,
      posts: [],
      originalPosts: []
    };
    this._handlePostsByTags = this._handlePostsByTags.bind(this)
    this.state.posts.map = this.state.posts.map.bind(this)
    this.setState = this.setState.bind(this)
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
        this.setState({ posts: responseJson, originalPosts: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <CreatePost currentPosts = {this.state.posts}/>
        <Tag posts={this.state.posts} handlePostsByTags={this._handlePostsByTags} />
        {this.state.posts.map(function(e) {
          return <Post currentPosts = {e} key = {e.id} />
        })}
      </div>
    )
  }
  _handlePostsByTags(e) {
    e.preventDefault();
    let newPosts = [];
    this.state.originalPosts.map(function(a){
      a.tags.map(function(i) {
        if (i.name === e.target.value) {
          newPosts.push(a)
        }
      })
    })
    if (this.state.posts === this.state.originalPosts) {
      this.setState({posts: newPosts})
    } else {
      let a = this.state.posts[0]
      let b = newPosts[0]
      if (a.id === b.id) {
        this.setState({posts: this.state.originalPosts})
      } else {
        this.setState({posts: newPosts})
      }
    }
  }
}
