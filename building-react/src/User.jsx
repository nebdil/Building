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
        <Link to={'/buildings/5/posts'}>Go back</Link>
        <p>Your posts</p>
        {this.state.posts.map(function(e) {
          if (!(e.hasOwnProperty('posts_user_replied_to'))) {
            return <UserPost currentUserPosts = {e} key = {e.id} />
          }
        })}
        <p>Posts you've commented</p>
        {this.state.posts.map(function(e) {
          if (e.hasOwnProperty('posts_user_replied_to')) {
            return (
              e.posts_user_replied_to.map(function(el) {
                return <UserReply currentUserReplies = {el} key = {el.id} />
              })
            )
          }
        })}
        <p>Logout</p>
      </div>
    )
  }
}
