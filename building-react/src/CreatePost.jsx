import React, {Component} from 'react';

export default class CreatePost extends Component {

  render() {

    return (
      <form className="send-post" onSubmit={this.props.handleNewPost}>
        <label htmlFor="post_content">
        </label>
        <input type="text" name="post_content" placeholder="Your post" onChange={this.props.handleContent} />
        <label htmlFor="tag_name">
        </label>
        <input type="text" name="tag_name" placeholder="Your tag" onChange={this.props.handleTag} />
        <button>Create post!</button>
      </form>
    )
  }
}
