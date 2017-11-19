import React, { Component } from 'react';
import UserPost from './UserPost.jsx';
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
      currentUserId: 13,
      posts: []
    };
  }

  componentDidMount() {
    return fetch('http://localhost:3000/buildings/5/users/13')
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
          return <UserPost currentUserPosts = {e} key = {e.id} />
        })}
        <p>Your commented posts</p>
        <p>Logout</p>
      </div>
    )
  }
}
