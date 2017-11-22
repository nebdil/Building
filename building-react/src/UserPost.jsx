import React, { Component } from 'react';
import UserPostReply from './UserPostReply.jsx';
import SendReply from './SendReply.jsx';
import Like from './Like.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
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

    const handleReplyChange = this.props.handleReplyChange;
    const handleReplySubmit = this.props.handleReplySubmit;
    const post = this.props.currentUserPosts.content;
    const postId = this.props.currentUserPosts.id;
    const user = this.props.currentUserPosts.username;
    const time = this.props.currentUserPosts.created_at;
    const replySize = this.props.currentUserPosts.reply.length;
    const likeSize = this.props.currentUserPosts.like.length;
    const divStyle = {
      border: "1px solid black"
    }
    return (
      <div>
        <table style={divStyle}>
          <tbody>
            <tr>
              <th>POST</th>
              <th>USER</th>
              <th>TIME</th>
              <th onClick={this.onClick.bind(this)}>REPLY SIZE</th>
              <th>REPLY BUTTON</th>
              <th>LIKE SIZE</th>
              <th>LIKE BUTTON</th>
              <th>TAG</th>
            </tr>
            <tr>
              <td>{post}</td>
              <td>{user}</td>
              <td>{time}</td>
              <td>{replySize}</td>
              <td><SendReply postId = {postId} handleReplyChange = {handleReplyChange} handleReplySubmit = {handleReplySubmit} /></td>
              <td>{likeSize}</td>
              <td><Like postId={postId}/></td>
              {this.props.currentUserPosts.tags.map(function(e) {
                return <td>{e.name}</td>
              })}
            </tr>
          </tbody>
        </table>
        {this.state.showReply && this.props.currentUserPosts.reply.map(function(e) {
          return <UserPostReply currentUserReplies = {e} key = {e.id}/>
        })}
      </div>
    )
  }
}
