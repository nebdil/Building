import React, { Component } from 'react';


export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false
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
    if (!this.state.like) {
      console.log(`likes: ${this.state.like}`)
      this.setState({like: true})
      fetch('/buildings/1/posts/3/likes', {
        method: 'POST'
        //post_id will come from post jsx, when they are all in the same component, with this
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.id);
        this.setState({likeId: responseJson.id});
        this.setState({postId: responseJson.post_id});
        console.log(this.state.likeId);
        console.log(this.state.postId);
      })
    } else {
      let id = this.state.likeId
      let post = this.state.postId
      console.log(`likes: ${this.state.like}`)
      this.setState({like: false})
      fetch(`/buildings/1/posts/${post}/likes/${id}`, {
        method: 'DELETE'
      });
    }
  }
}
