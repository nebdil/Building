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
      originalPosts: [],
      unique_tags: []
    };
    this._handlePostsByTags = this._handlePostsByTags.bind(this)
    this.state.posts.map = this.state.posts.map.bind(this)
    this.setState = this.setState.bind(this)
    this._handleNewPost = this._handleNewPost.bind(this)
  }
  componentDidMount() {
    return fetch('http://localhost:3000/buildings/1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson, originalPosts: responseJson })
      })
      .then(() => {
        let newArr = [];
        this.state.posts.map(function(e) {
          e.tags.map(function(a) {
            newArr.push(a.name)
          })
        })
        this.setState({unique_tags: [...new Set(newArr)]})
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <CreatePost currentPosts = {this.state.posts} handleNewPost={this._handleNewPost}/>
        <Tag posts={this.state.posts} handlePostsByTags={this._handlePostsByTags} unique_tags={this.state.unique_tags}/>
        {this.state.posts.map(function(e) {
          return <Post currentPosts = {e} key = {e.id} />
        })}
      </div>
    )
  }

  _handleNewPost(e) {
    e.preventDefault();
    console.log(e.target)
    const content = new FormData(e.target);
    fetch('/buildings/1/posts/', {
      method: 'POST',
      body: content
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      const posts = this.state.posts.concat(responseJson)
      const originalPosts = this.state.originalPosts.concat(responseJson)
      this.setState({posts: posts, originalPosts: originalPosts})
    })
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
