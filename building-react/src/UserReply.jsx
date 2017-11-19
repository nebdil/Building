import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class UserReply extends Component {
  render() {
    const reply = this.props.currentUserReplies.content
    return <div>{reply}</div>
  }
}
