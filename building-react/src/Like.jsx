import React, { Component } from 'react';

export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      likeId: '',
      postId: '',
      user_id: ''
    }
    this._handleLike = this._handleLike.bind(this)
  }
  render() {
    this.props.likes.map((e) => {
      console.log(e)
    })
    console.log('e.like from building: ' + this.props.likes)
    return(
      <button onClick={this._handleLike}>LIKE BUTTON</button>
    )
  }
  _handleLike(e) {
    console.log('in handle like')
    // alert(this.props.postId)
    // if (this.state.user_id == false) {
      let id = this.props.postId
      console.log(`likes: ${this.state.like}`)
      this.setState({like: true})
      let data = {
        email: localStorage.getItem('user_email'),
        likes: this.props.likes
      }
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
        this.setState({user_id: responseJson.user.id})
        console.log(this.state.user_id)
        // this.setState({likeId: responseJson.like.id || null});
        // console.log(this.state.likeId);
        // console.log(this.state.postId);
      })
    // }
    // else {
    //   // let id = this.state.likeId
    //   // let post = this.state.postId
    //   // console.log(this.state.likeId);
    //   // console.log(this.state.postId);
    //   // alert(this.state.likeId)
    //   let postId = this.props.postId;
    //   let likeId = this.state.likeId;
    //   let data = {
    //     likeId: this.state.likeId
    //   }
    //   console.log(this.state.like)
    //   this.setState({like: false})
    //   fetch(`/buildings/1/posts/${postId}/likes/${likeId}`, {
    //     method: 'DELETE',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Authorization': `bearer ${localStorage.getItem('user_token')}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });
    // }
  }
}
