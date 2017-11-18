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
          <tr>{post}</tr>
          <tr>user: {user}</tr>
          <tr>time: {time}</tr>
          <tr>{replySize} replies</tr>
          <tr>{likeSize} likes</tr>
        </table>
        {this.state.showReply && this.props.currentPosts.reply.map(function(e) {
          return <Reply currentReplies = {e} key = {e.id}/>
        })}
      </div>
    )
  }
}
