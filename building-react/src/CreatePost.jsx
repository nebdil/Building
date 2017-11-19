import React, {Component} from 'react';
import CreateTag from './CreateTag.jsx';

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
        <CreateTag />
        <button>Create post!</button>
      </form>
    )

  }
  _handleNewPost(e) {
    e.preventDefault();
    console.log(e.target)
    const content = new FormData(e.target);
    fetch('/buildings/5/posts/', {
      method: 'POST',
      body: content
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.props.currentPosts.push(responseJson)
      console.log(this.props.currentPosts)
    })
  }


  _handleChange(e) {
    console.log('in hangle change' + e.target.value)
  }
}
