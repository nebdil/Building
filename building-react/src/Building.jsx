import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import CreatePost from './CreatePost.jsx'
import SendReply from './SendReply.jsx'
import Login from './Login.jsx'
import { Panel, Row, Col } from 'react-bootstrap'
import moment from 'moment'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      originalPosts: [],
      unique_tags: [],
      showReply: false,
      currentPost: '',
      user_token: localStorage.getItem('user_token'),
      user_email: localStorage.getItem('user_email'),
      createContent: '',
      createTag: ''
    };
    this._handlePostsByTags = this._handlePostsByTags.bind(this)
    this.state.posts.map = this.state.posts.map.bind(this)
    this.setState = this.setState.bind(this)
    this._handleNewPost = this._handleNewPost.bind(this)
    this._handlePostChange = this._handlePostChange.bind(this)
    this._handleLikes = this._handleLikes.bind(this)
    this._handleContent = this._handleContent.bind(this)
    this._handleTag = this._handleTag.bind(this)
  }
  // const title = (
  //   <h3>{}</h3>
  // );
  componentDidMount() {
    return (fetch(`http://localhost:3000/buildings/1/`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson, originalPosts: responseJson })
      })
      .catch((error) => {
        console.error(error);
      })
    )
  }
  render() {
    if (this.state.user_token === 'null') {
      return (
        <Login />
      )
    } else {
      // console.log('this.state.posts: ' + this.state.posts)
      return (
        <div>
          <CreatePost currentPosts = {this.state.posts} handleNewPost = {this._handleNewPost} handlePostChange = {this._handlePostChange} handleContent={this._handleContent} handleTag={this._handleTag}/>
          <Tag posts={this.state.originalPosts} handlePostsByTags={this._handlePostsByTags} />
          <table>
            <tbody>
              {this.state.posts.map((e) => {
                const head = (
                  <Row>
                    <Col md={8}>{e.username}</Col>
                    <Col md={4}>{moment(e.created_at).startOf('second').fromNow()}</Col>
                  </Row>
                );
                const foot = (
                  <Row>
                    <Col md={4}>{e.tags.map((a) => {return a.name})}</Col>
                    <Col md={4}>{e.reply.length}</Col>
                    <Col md={4}>
                      <Row>
                        <Col md={6}><Like postId={e.id} likes={e.like} handleLikes={this._handleLikes}/></Col>
                        <Col md={6}>{e.like.length}</Col>
                      </Row>
                    </Col>
                  </Row>
                );
                return(
                  <Panel header={head} footer={foot}>
                    <Link to={`/buildings/1/posts/${e.id}`} posts={e}>{e.content}</Link>
                    {/* <td><SendReply postId = {e.id} handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} postId={e.id} /></td> */}
                  </Panel>
                )
              })}
            </tbody>
          </table>
          <Switch>
            <Route path={`/buildings/:id/posts/:id`} component={Post} />
          </Switch>
        </div>
      )
    }
  }
  _handleLikes(e) {
    this.setState({posts: e, originalPosts: e})
  }
  // _handleNewPost(e) {
  //   e.preventDefault();
  //   console.log(e.target)
  //   const content = new FormData(e.target);
  //   fetch('/buildings/1/posts/', {
  //     method: 'POST',
  //     body: content
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(responseJson)
  //     const posts = this.state.posts.concat(responseJson)
  //     const originalPosts = this.state.originalPosts.concat(responseJson)
  //     this.setState({posts: posts, originalPosts: originalPosts})
  //   })
  // }
  _handlePostsByTags(e) {
    e.preventDefault();
    let newPosts = [];
    this.state.originalPosts.map(function(a){
      a.tags.map(function(i) {
        if (i.name === e.target.value) {
          newPosts.push(a)
        }
      })
    })
    if (this.state.posts === this.state.originalPosts) {
      this.setState({posts: newPosts})
    } else {
      let a = this.state.posts[0]
      let b = newPosts[0]
      if (a.id === b.id) {
        this.setState({posts: this.state.originalPosts})
      } else {
        this.setState({posts: newPosts})
      }
    }
  }
  _handleContent(e) {
    e.preventDefault();
    this.setState({createContent: e.target.value})
    console.log(this.state.createContent)
  }
  _handleTag(e) {
    e.preventDefault();
    this.setState({createTag: e.target.value})
    console.log(this.state.createTag)
  }
  _handleNewPost(e) {
    e.preventDefault();
    console.log('e.target: ' + e.target)
    // const content = {form: new FormData(e.target), user_email: localStorage.getItem('user_email')};
    const content = {
      content: this.state.createContent,
      tag: this.state.createTag,
      user_email: localStorage.getItem('user_email')
    }
    console.log(content)
    fetch('/buildings/1/posts/', {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((newPost) => {
      console.log(newPost)
      const newPostArr = [newPost]
      const posts = newPostArr.concat(this.state.posts)
      // const originalPosts = this.state.originalPosts.concat(newPost)
      console.log(posts)
      console.log('setting the state for post')
      this.setState({posts: posts, originalPosts: posts})
      console.log('just set the state')
    })
  }
  _handlePostChange(e) {
    console.log('in handle change' + e.target.value)
  }
}
