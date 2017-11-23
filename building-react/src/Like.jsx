import React, { Component } from 'react';

export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      likeId: '',
      postId: ''
    }
    this._handleLike = this._handleLike.bind(this)
  }
  render() {
    return(
      <button onClick={this._handleLike}>LIKE BUTTON</button>
    )
  }
  _handleLike(e) {
    console.log('in handle like')
    // alert(this.props.postId)
    if (!this.state.like) {
      let id = this.props.postId
      console.log(`likes: ${this.state.like}`)
      this.setState({like: true})
      let data = {email: localStorage.getItem('user_email')}
      alert(JSON.stringify(data))
      fetch(`/buildings/1/posts/${id}/likes`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `bearer ${localStorage.getItem('user_token')}`,
          'Content-Type': 'application/json'
        }
        //post_id will come from post jsx, when they are all in the same component, with this
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({likeId: responseJson.id, postId: responseJson.post_id});
        console.log(this.state.likeId);
        console.log(this.state.postId);
      })
    }
    // else {
    //   let id = this.state.likeId
    //   let post = this.state.postId
    //   console.log(this.state.likeId);
    //   console.log(this.state.postId);
    //   console.log(`likes: ${this.state.like}`)
    //   this.setState({like: false})
    //   fetch(`/buildings/1/posts/${post}/likes/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Authorization': `bearer ${localStorage.getItem('user_token')}`
    //     }
    //   });
    // }
  }
}
