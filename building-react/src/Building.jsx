import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import CreatePost from './CreatePost.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
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
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
    this._handleNewPost = this._handleNewPost.bind(this)
    this._handlePostChange = this._handlePostChange.bind(this)
  }
  componentDidMount() {
    return fetch('http://localhost:3000/buildings/1/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson, originalPosts: responseJson })
      })
      // .then(() => {
      //   let newArr = [];
      //   this.state.posts.map(function(e) {
      //     e.tags.map(function(a) {
      //       newArr.push(a.name)
      //     })
      //   })
      //   this.setState({unique_tags: [...new Set(newArr)]})
      // })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <CreatePost currentPosts = {this.state.posts} handleNewPost = {this._handleNewPost} handlePostChange = {this._handlePostChange} />
        <Tag posts={this.state.posts} handlePostsByTags={this._handlePostsByTags} unique_tags={this.state.unique_tags}/>
        {this.state.posts.map((e) => {
          return <Post handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} currentPosts = {e} key = {e.id} />
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

  _handleReplyChange(e) {
    console.log('in handleReplyChange:', e.target.value);
  }

  _handleReplySubmit(e) {
    e.preventDefault();
    console.log(e.currentTarget)
    const content = new FormData(e.currentTarget);
    const repliesPostId = e.currentTarget.getAttribute('data-post-id')
    console.log(repliesPostId);
    this.state.posts.forEach((post) => {
      if (post.id == repliesPostId) {
        console.log('we got a match, post:', post);
        fetch(`http://localhost:3000/buildings/1/posts/${post.id}/replies`, {
          method: 'POST',
          body: content
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          const replies = post.reply.push(responseJson)
          this.setState({posts: this.state.posts})
        })
      }
    })
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
    .then((newPost) => {
      console.log(newPost)
      const newPostArr = [newPost]
      const posts = newPostArr.concat(this.state.posts)
      const originalPosts = this.state.originalPosts.concat(newPost)
      console.log(posts)
      console.log('setting the state for post')
      this.setState({posts: posts, originalPosts: this.state.originalPosts})
      console.log('just set the state')
    })
  }

  _handlePostChange(e) {
    console.log('in handle change' + e.target.value)
  }

}
