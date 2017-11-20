import React, {Component} from 'react';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this)
  }

  render() {

    return (
      <form onSubmit={this.props.handleNewPost}>
        <label htmlFor="post_content">
          New Post:
        </label>
        <input type="text" name="post_content" placeholder="Your post" onChange={this._handleChange} />
        <label htmlFor="tag_name">
          New Tag:
        </label>
        <input type="text" name="tag_name" placeholder="Your tag" onChange={this._handleChange} />
        <button>Create post!</button>
      </form>
    )

  }
  _handleChange(e) {
    console.log('in hangle change' + e.target.value)
  }
}
