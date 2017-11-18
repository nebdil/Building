import React, {Component} from 'react';

export default class CreatePost extends Component {
  constructor(props) {
    super();
    this._handleNewPost = this._handleNewPost.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  render() {
    return (
      <form onSubmit={this._handleNewPost}>
        <label htmlFor="content">
          New Post:
        </label>
        <input type="text" name="content" placeholder="Your post" onChange={this._handleChange} />
        <button>Create post!</button>
      </form>
    )
  }
  _handleNewPost(e) {
    e.preventDefault();
    // const content = new FormData(e.target);
    console.log(e.target)
    const content = new FormData(e.target);
    fetch('/buildings/1/posts/', {
      method: 'POST',
      body: content
    })
    .then(() => {
      console.log(this.props.currentPosts)
    })
  }


  _handleChange(e) {
    console.log('in hangle change' + e.target.value)
  }
}
