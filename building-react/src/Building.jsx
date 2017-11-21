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
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
  }
  componentDidMount() {
    return fetch('http://localhost:3000/buildings/1/')
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
        {this.state.posts.map((e) => {
          return <Post handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} currentPosts = {e} key = {e.id} />
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
        fetch(`http://localhost:3000/buildings/1//posts/${post.id}/replies`, {
          method: 'POST',
          body: content
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          const replies = post.reply.unshift(responseJson)
          this.setState({posts: this.state.posts})
        })
      }
    })
  }

}
