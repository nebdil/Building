import React, { Component } from 'react';
import UserReplyReply from './UserReplyReply.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class UserReply extends Component {
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

    console.log('inside UserReply')
    const post = this.props.currentUserReplies.content;
    const user = this.props.currentUserReplies.username;
    const time = this.props.currentUserReplies.created_at;
    const replySize = this.props.currentUserReplies.reply.length;
    const likeSize = this.props.currentUserReplies.like.length;
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
              {this.props.currentUserReplies.tags.map(function(e) {
                return <td>{e.name}</td>
              })}
            </tr>
          </tbody>
        </table>
        {this.state.showReply && this.props.currentUserReplies.reply.map(function(e) {
          return <UserReplyReply currentUserReplyReplies = {e} key = {e.id}/>
        })}
      </div>
    )
  }
}
