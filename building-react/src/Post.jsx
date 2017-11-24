import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Dialog from './Dialog'
import SendReply from './SendReply.jsx'
import Like from './Like.jsx'
import { Panel, Row, Col } from 'react-bootstrap'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postId: (this.props.match.params.id || null),
      show: true,
      redirect: ''
    }
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
  }

  componentDidMount() {
    return(fetch(`http://localhost:3000/buildings/1/posts/${this.state.postId}`, {
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
    this.setState({show: false, redirect: '/buildings/1/posts'})
  }

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />
    if (this.state.post) {
      const title = (
          <Row>
            <Col xs={12} md={8}>{this.state.post.username}</Col>
            <Col xs={6} md={4}>{this.state.post.created_at}</Col>
          </Row>
        );
      const foot = (
        <Row>
          <Col xs={12} md={8}>{this.state.tags}</Col>
          <Col xs={6} md={4}>
            <Row>
              <Col md={6} mdPull={6}><Like postId={this.state.postId}/></Col>
              <Col md={6} mdPull={6}>{this.state.post.like.length}</Col>
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
              <p>
               <strong>{this.state.post.content}</strong>.
              </p>
              {this.state.post.reply.map((e) => {
                return <p>{e.content}</p>
              })}
              <SendReply postId = {this.state.postId} handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} postId={this.state.postId} />
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
  _handleReplyChange(e) {
    console.log('in handleReplyChange:', e.target.value);
  }
  _handleReplySubmit(e) {
    e.preventDefault();
    console.log(e.currentTarget)
    const content = new FormData(e.currentTarget);
    const repliesPostId = e.currentTarget.getAttribute('data-post-id')
    console.log(repliesPostId);
      if (this.state.postId == repliesPostId) {
        console.log('we got a match, post:', this.state.postId);
        fetch(`http://localhost:3000/buildings/1/posts/${this.state.postId}/replies`, {
          method: 'POST',
          body: content,
          headers: {
            'Authorization': `bearer ${localStorage.getItem('user_token')}`
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          const replies = this.state.post.reply.push(responseJson)
          this.setState({post: this.state.post})
        })
      }
  }
}
