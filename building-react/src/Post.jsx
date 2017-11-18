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
    const user = this.props.currentPosts.username;
    const time = this.props.currentPosts.created_at;
    const replySize = this.props.currentPosts.reply.length;
    const likeSize = this.props.currentPosts.like.length;

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>POST</th>
              <th>USER</th>
              <th>TIME</th>
              <th>REPLY SIZE</th>
              <th>LIKE SIZE</th>
              <th>LIKE BUTTON</th>
            </tr>
            <tr>
              <td>{post}</td>
              <td>{user}</td>
              <td>{time}</td>
              <td>{replySize}</td>
              <td>{likeSize}</td>
              <td><Like/></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
