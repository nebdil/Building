import React, { Component } from 'react';

export default class UserReplyReply extends Component {
  render() {
    const reply = this.props.currentUserReplyReplies.content
    return <div>{reply}</div>
  }
}
