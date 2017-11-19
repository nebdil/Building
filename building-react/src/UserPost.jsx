import React, { Component } from 'react';
import UserReply from './UserReply.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class UserPost extends Component {
  constructor() {
    super();
    this.state = {
      showReply: false
    }
  }
  onClick(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply})
  }
  render() {

    const post = this.props.currentUserPosts.content;
    const user = this.props.currentUserPosts.username;
    const time = this.props.currentUserPosts.created_at;
    const replySize = this.props.currentUserPosts.reply.length;
    const likeSize = this.props.currentUserPosts.like.length;
    const divStyle = {
      border: "1px solid black"
    }
    return (
      <div onClick={this.onClick.bind(this)}>
        <table style={divStyle}>
          <tbody>
            <tr>
              <th>POST</th>
              <th>USER</th>
              <th>TIME</th>
              <th>REPLY SIZE</th>
              <th>LIKE SIZE</th>              
              <th>TAG</th>
            </tr>
            <tr>
              <td>{post}</td>
              <td>{user}</td>
              <td>{time}</td>
              <td>{replySize}</td>
              <td>{likeSize}</td>
              {this.props.currentUserPosts.tags.map(function(e) {
                return <td>{e.name}</td>
              })}
            </tr>
          </tbody>
        </table>
        {this.state.showReply && this.props.currentUserPosts.reply.map(function(e) {
          return <UserReply currentUserReplies = {e} key = {e.id}/>
        })}
      </div>
    )
  }
}
