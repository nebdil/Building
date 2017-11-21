import React, { Component } from 'react';
import UserPost from './UserPost.jsx';
import UserReply from './UserReply.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      posts: []
    };
    this.setState = this.setState.bind(this)
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
  }

  componentDidMount() {
    return fetch('http://localhost:3000/buildings/1/users/1')
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
        <Link to={'/buildings/1/posts'}>Go back</Link>
        <p>Your posts</p>
        {this.state.posts.map((e) => {
          if (!(e.hasOwnProperty('posts_user_replied_to'))) {
            return <UserPost handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} currentUserPosts = {e} key = {e.id} />
          }
        })}
        <p>Posts you've commented</p>
        {this.state.posts.map((e) => {
          if (e.hasOwnProperty('posts_user_replied_to')) {
            return (
              e.posts_user_replied_to.map((el) => {
                return <UserReply handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} currentUserReplies = {el} key = {el.id} />
              })
            )
          }
        })}
        <p>Logout</p>
      </div>
    )
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
