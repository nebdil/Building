import React, { Component } from 'react';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Post extends Component {
  render() {
    const post = this.props.currentPosts.content;
    const user = this.props.currentPosts.user_id;
    const time = this.props.currentPosts.created_at;
    return (
      <div>
        <table>
          <tr>{post}</tr>
          <tr>{user}</tr>
          <tr>{time}</tr>
        </table>
      </div>
    )
  }
}
