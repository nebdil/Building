import React, { Component } from 'react';

export default class UserPostReply extends Component {
  render() {
    const reply = this.props.currentUserReplies.content
    return <div>{reply}</div>
  }
}
