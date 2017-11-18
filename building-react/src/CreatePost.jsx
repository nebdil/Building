import React, {Component} from 'react';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      posts: []
    };
    this.setState = this.setState.bind(this)
    this._handleNewPost = this._handleNewPost.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }
  componentDidMount() {
    return fetch('http://localhost:3000/buildings/1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
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
    });
  }


  _handleChange(e) {
    console.log('in hangle change' + e.target.value)
  }
}
