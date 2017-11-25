import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Dialog from './Dialog'
import SendReply from './SendReply.jsx'
import Like from './Like.jsx'
import { Panel, Row, Col, ListGroup, ListGroupItem, ButtonToolbar, Button} from 'react-bootstrap'
import moment from 'moment'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postId: (this.props.match.params.id || null),
      show: true,
      redirect: '',
      reply: ''
    }
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
    this._handleUsername = this._handleUsername.bind(this)
    this._handleLikeChange = this._handleLikeChange.bind(this)
  }

  componentDidMount() {
    console.log('in post: ')
    console.log(this.props.match)
    return(fetch(`http://localhost:3000${this.props.match.url}`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({post: responseJson})
    })
    .then(() => {
      this.state.post.tags.map((e) => {
        let arr = []
        arr.push(e.name)
        this.setState({tags: arr})
      })
    })
    )
  }
    _hide = () => {
      // if(this.props.match.path == "/buildings/:building_id/posts/:id") {
      //   console.log('in if')
        this.setState({show: false, redirect: `/buildings/${this.props.match.params.building_id}/posts`})
      // }
    //   else {
    //       this.setState({show: false, redirect: `/buildings/${this.props.propS.params.building_id}/users/${this.props.propS.params.id}`})
    // }
    }



  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    if (this.state.post) {
      const title = (
        <div>
          <Col md={9}>
            {this.state.post.username}: {this.state.post.content}
          </Col>
          <Col mdOffset md={3}>
            <Row>
              <ButtonToolbar>
                <Button bsSize="xsmall">{this.state.tags}</Button>
              </ButtonToolbar>
            </Row>
            <Row>
              {moment(this.state.post.created_at).startOf('second').fromNow()}
            </Row>
          </Col>
        </div>
        );
      const foot = (
        <Row>
          <Col md={9}>
            <SendReply postId = {this.state.postId} handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} handleUsername={this._handleUsername} postId={this.state.postId} />
          </Col>
          <Col md={3}>
            <Row>
              <Col>
                {this.state.post.like.length}
              </Col>
              <Col>
                <Like postId={this.state.postId} propS={this.props} handleLikes={this.props.handleLikes} handleLikeChange={this._handleLikeChange}/>
              </Col>
            </Row>
          </Col>
        </Row>
      );
      return (
        <div>
          {
            this.state.postId && this.state.post.reply &&
            <Dialog
              show={this.state.show}
              onHide={this._hide}
              title={title}
              footer={foot}>
              {this.state.post.reply.map((e) => {return (
                <ListGroup fill>
                  <ListGroupItem>
                     {e.username}: {e.content} ({moment(e.created_at).startOf('second').fromNow()})
                  </ListGroupItem>
                </ListGroup>
              )})}
            </Dialog>
          }
        </div>
      )
    } else {
      return(
        <p>Loading</p>
      )
    }
  }
  _handleLikeChange(e) {
    this.setState({post: e})
  }
  _handleReplyChange(e) {
    console.log('in handleReplyChange:', e.target.value);
    this.setState({reply: e.target.value})
  }
  _handleUsername(e) {
    alert('in _handleUsername: ', e)
  }
  _handleReplySubmit(e) {
    e.preventDefault();
    // console.log(e.currentTarget)
    // const content = new FormData(e.currentTarget);
    const obj = {
      reply: this.state.reply,
      user_email: localStorage.getItem('user_email')
    }
    const repliesPostId = e.currentTarget.getAttribute('data-post-id')
    // console.log(repliesPostId);
      if (this.state.postId == repliesPostId) {
        // console.log('we got a match, post:', this.state.postId);
        fetch(`http://localhost:3000${this.props.match.url}/replies`, {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Authorization': `bearer ${localStorage.getItem('user_token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson)
          const replies = this.state.post.reply.push(responseJson.reply)
          this.setState({post: this.state.post})
        })
      }
  }
}
