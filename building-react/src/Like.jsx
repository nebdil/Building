import React, { Component } from 'react';

export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      likeId: '',
      postId: '',
      user_id: '',
      likes_length: this.props.likes.length
    }
    this._handleLike = this._handleLike.bind(this)
  }
  render() {
    return(
      <div>
        <button onClick={this._handleLike}>LIKE BUTTON</button>
      </div>
    )
  }
  _handleLike(e) {
    console.log('in handle like')
    let id = this.props.postId
    let data = {
      email: localStorage.getItem('user_email'),
      likes: this.props.likes
    }
    fetch(`/buildings/1/posts/${id}/likes`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      this.props.handleLikes(responseJson)
    })
  }
}
