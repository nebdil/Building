import React, {Component} from 'react';

export default class CreatePost extends Component {

  render() {

    return (
      <form className="send-post" onSubmit={this.props.handleNewPost}>
        <label htmlFor="post_content">
        </label>
        <textarea className="post-container" name="post_content" placeholder="What's going on?" onChange={this.props.handleContent} />
        <label htmlFor="tag_name">
        </label>
        <input className="tag-container" type="text" name="tag_name" placeholder="Add a tag!" onChange={this.props.handleTag} />
        <button>Create post!</button>
        <hr />
      </form>
    )
  }
}
