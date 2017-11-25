import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap'

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
    // console.log('in like: ')
    // console.log(this.props.propS.match)
    return(
      <div>
        {/* <button onClick={this._handleLike}>LIKE BUTTON</button> */}
        <ButtonToolbar>
          <Button id="peace-div" bsSize="xsmall" type="submit" onClick={this._handleLike}><i class="fa fa-hand-peace-o" aria-hidden="true"></i></Button>
          <p>{this.props.likeLength}</p>
        </ButtonToolbar>
      </div>
    )
  }
  _handleLike(e) {
    console.log('in handle like')
    console.log(this.props.propS)

    if (this.props.propS.match.params.id) {
      let data = {
        email: localStorage.getItem('user_email')
      }
      fetch(`/buildings/${this.props.propS.match.params.building_id}/posts/${this.props.propS.match.params.id}/likes`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `bearer ${localStorage.getItem('user_token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('FINALLY RECEIVING')
        console.log(responseJson);
        // console.log(this.props.propS.handleLikes)
        responseJson.map((e) => {
          console.log(e.id)
          console.log(this.props.propS.match.params.id)
          if (e.id == this.props.propS.match.params.id) {
            console.log('in new map')
            console.log(e)
            this.props.handleLikeChange(e)
          }
        })
        this.props.handleLikes(responseJson)
      })
    } else {
      let id = this.props.postId
      let data = {
        email: localStorage.getItem('user_email'),
        likes: this.props.likes
      }
      fetch(`/buildings/${this.props.propS.match.params.building_id}/posts/${id}/likes`, {
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
}
