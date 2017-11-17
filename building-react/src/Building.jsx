import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';

export default class Building extends Component {
  render() {
    const dilan = this.props.currentPosts.content;
    return (
      <div>
        <div>
          {dilan}
        </div>
      </div>
    )
  }
}


{/* <div>
  <div className="message">
    <span className="message-username">{currentMessage.username}</span>
    <span className="message-content">{currentMessage.content}</span>
  </div>
  <div className="message system"></div>
</div> */}
