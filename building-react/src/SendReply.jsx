import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class SendReply extends Component {
  render() {

    const handleSubmit = this.props.handleReplySubmit;
    const handleChange = this.props.handleReplyChange;

    return (
      <form onSubmit={handleSubmit} data-post-id = {this.props.postId} id = "post-id">
        <label htmlFor="post_content">
          New Reply:
        </label>
        <input type="text" name="post_content" placeholder="Your reply" onChange={handleChange} />
        <input type="submit" value="Create reply!" />
      </form>
    )

  }
}
