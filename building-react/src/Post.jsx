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

    const post = this.props.currentPosts.content;
    const postId = this.props.currentPosts.id;
    const user = this.props.currentPosts.username;
    const time = this.props.currentPosts.created_at;
    const replySize = this.props.currentPosts.reply.length;
    const likeSize = this.props.currentPosts.like.length;
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
              <th>LIKE BUTTON</th>
              <th>TAG</th>
            </tr>
            <tr>
              <td>{post}</td>
              <td>{user}</td>
              <td>{time}</td>
              <td>{replySize}</td>
              <td>{likeSize}</td>
              <td><Like postId={postId}/></td>
              {this.props.currentPosts.tags.map(function(e) {
                return <td>{e.name}</td>
              })}
            </tr>
          </tbody>
        </table>
        {this.state.showReply && this.props.currentPosts.reply.map(function(e) {
          return <Reply currentReplies = {e} key = {e.id}/>
        })}
      </div>
    )
  }
}
