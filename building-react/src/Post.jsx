import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Dialog from './Dialog'
import SendReply from './SendReply.jsx'
import Like from './Like.jsx'
import { Panel, Row, Col, ListGroup, ListGroupItem, ButtonToolbar, Button, Grid} from 'react-bootstrap'
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
    return(fetch(`${this.props.match.url}`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`,
        'Content-Type': 'application/json'
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
        window.location.reload()
      // }
    //   else {
    //       this.setState({show: false, redirect: `/buildings/${this.props.propS.params.building_id}/users/${this.props.propS.params.id}`})
    // }
    }



  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    if (this.state.post) {
      const title = (
        <div id="mdl-header">
          <Row className="modal-first-row">
            <Col className="user-name" md={8}>
              <p>{this.state.post.username}</p>
            </Col>
            <Col className="modal-time" md={4}>
              <p>{moment(this.state.post.created_at).startOf('second').fromNow()}</p>
            </Col>
          </Row>
          <Row>
            <Col className="modal-cntnt" md={12}>
              {this.state.post.content}
            </Col>
          </Row>
          <Row>
            <Col md={4} id="tag-div"><div className="tag-div">{this.state.tags}</div></Col>
            <Col md={4}></Col>
            <Col md={4}>
              <Col md={6}></Col>
              <Col className="peace" md={6}>
                <div className="peace-group">
                  <Like postId={this.state.post.id} likes={this.state.post.like} handleLikes={this.props.handleLikes} handleLikeChange={this._handleLikeChange} likeLength={this.state.post.like.length} propS={this.props}/>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
        );
      const foot = (
        <Row>
          <Col id="send-reply" md={12}>
            <SendReply postId = {this.state.postId} handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} handleUsername={this._handleUsername} postId={this.state.postId} />
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
                    <Row>
                      <Col md={8}><p className="replier-name">{e.username}</p></Col>
                      <Col md={4}><p id="comment-time">{moment(e.created_at).startOf('second').fromNow()}</p></Col>
                    </Row>
                    <p>{e.content}</p>
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
    e.target.reset()
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
