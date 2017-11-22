import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class UserReplyReply extends Component {
  render() {
    const reply = this.props.currentUserReplyReplies.content
    return <div>{reply}</div>
  }
}
