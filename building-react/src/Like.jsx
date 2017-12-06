import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap'
import classNames from 'classnames'


export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      likeId: '',
      postId: '',
      user_id: '',
      liked: ''
    }
    this._handleLike = this._handleLike.bind(this)
  }
  componentWillMount() {
    this.props.likes.map((a) => {
      if (a.user_id == localStorage.getItem('user_id')) {
        this.setState({liked: true})
        console.log('LIKED TRUEEEEE')
      } else {
        this.setState({liked: false})
        console.log('LIKED FALSSEEEEE')
      }
    })
  }
  render() {
    var btnClass = classNames({
      'fa fa-heart': this.state.liked,
      'fa fa-heart-o': !this.state.liked
    })
    return(
      <div>
        <ButtonToolbar>
          <Button id="peace-div" bsSize="xsmall" type="submit" onClick={this._handleLike}><i class={btnClass} aria-hidden="true"></i></Button>
          <p>{this.props.likeLength}</p>
        </ButtonToolbar>
      </div>
    )
  }
  _handleLike(e) {
    console.log('in handle like')
    console.log(this.props.propS)
    console.log(this.props.propS.path)
    this.setState({liked: !this.state.liked})

    if (this.props.propS.path ==
"/buildings/:building_id/users/:id") {
      let data = {
        email: localStorage.getItem('user_email')
      }
      fetch(`/buildings/${this.props.propS.params.building_id}/posts/${this.props.postId}/likes`, {
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
        responseJson.map((e) => {
          console.log(e.id)
          console.log(this.props.propS.params.id)
          if (e.id == this.props.propS.params.id) {
            console.log('in new map')
            console.log(e)
          }
        })
        this.props.handleLikes(responseJson)
      })
    }
    else if (this.props.propS.match.params.id) {
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
    }  else {
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
        this.props.handleLikes(responseJson)
      })
    }
  }
}
