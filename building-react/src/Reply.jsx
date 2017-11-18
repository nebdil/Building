import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Reply extends Component {
  render() {
    const reply = this.props.currentReplies.content
    return <div>{reply}</div>
  }
}
