import React, { Component } from 'react';

export default class Reply extends Component {
  render() {
    const reply = this.props.currentReplies.content
    return <div>{reply}</div>
  }
}
