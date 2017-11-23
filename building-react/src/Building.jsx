import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import CreatePost from './CreatePost.jsx'
import SendReply from './SendReply.jsx'
import Login from './Login.jsx'

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      posts: [],
      originalPosts: [],
      unique_tags: [],
      showReply: false,
      currentPost: '',
      user_token: localStorage.getItem('user_token'),
      user_email: localStorage.getItem('user_email')
    };
    this._handlePostsByTags = this._handlePostsByTags.bind(this)
    this.state.posts.map = this.state.posts.map.bind(this)
    this.setState = this.setState.bind(this)
    this._handleNewPost = this._handleNewPost.bind(this)
    this._handlePostChange = this._handlePostChange.bind(this)
    this._handleLikes = this._handleLikes.bind(this)
  }
  componentDidMount() {
    // let newArr = [];

    return (fetch(`http://localhost:3000/buildings/1/`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson, originalPosts: responseJson })
      })
      // .then(() => {
      //   this.state.posts.map(function(e) {
      //     e.tags.map(function(a) {
      //       newArr.push(a.name)
      //     })
      //   })
      // })
      // .then(() => {
      //   this.setState({unique_tags: [...new Set(newArr)]})
      //   console.log(this.state.unique_tags)
      // })
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
      return (
        <div>
          <CreatePost currentPosts = {this.state.posts} handleNewPost = {this._handleNewPost} handlePostChange = {this._handlePostChange} />
          <Tag posts={this.state.originalPosts} handlePostsByTags={this._handlePostsByTags} unique_tags={this.state.unique_tags}/>
          <table>
            <tbody>
              <tr>
                <th>POST</th>
                <th>USER</th>
                <th>TIME</th>
                <th>REPLY SIZE</th>
                <th>LIKE SIZE</th>
                <th>LIKE BUTTON</th>
                <th>TAG</th>
              </tr>

              {this.state.posts.map((e) => {
                return(
                  <tr>
                    <td><Link to={`/buildings/1/posts/${e.id}`} posts={e}>{e.content}</Link></td>
                    <td>{e.username}</td>
                    <td>{e.created_at}</td>
                    <td>{e.reply.length}</td>
                    {/* <td><SendReply postId = {e.id} handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} postId={e.id} /></td> */}
                    <td>{e.like.length}</td>
                    <td>
                      <Like postId={e.id} likes={e.like} handleLikes={this._handleLikes}/>
                    </td>
                    {e.tags.map(function(a) {
                      return <td>{a.name}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Switch>
            <Route path={`/buildings/1/posts/:id`} component={Post} />
          </Switch>
        </div>
      )
    }
  }
  _handleLikes(e) {
    // e.preventDefault();
    console.log('e.target: ' + e)
    this.setState({likes_length: e})
  }
  _handleNewPost(e) {
    e.preventDefault();
    console.log(e.target)
    const content = new FormData(e.target);
    fetch('/buildings/1/posts/', {
      method: 'POST',
      body: content
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      const posts = this.state.posts.concat(responseJson)
      const originalPosts = this.state.originalPosts.concat(responseJson)
      this.setState({posts: posts, originalPosts: originalPosts})
    })
  }
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
  _handleNewPost(e) {
    e.preventDefault();
    console.log(e.target)
    const content = new FormData(e.target);
    fetch('/buildings/1/posts/', {
      method: 'POST',
      body: content,
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
    .then((response) => response.json())
    .then((newPost) => {
      console.log(newPost)
      const newPostArr = [newPost]
      const posts = newPostArr.concat(this.state.posts)
      const originalPosts = this.state.originalPosts.concat(newPost)
      console.log(posts)
      console.log('setting the state for post')
      this.setState({posts: posts, originalPosts: this.state.originalPosts})
      console.log('just set the state')
    })
  }
  _handlePostChange(e) {
    console.log('in handle change' + e.target.value)
  }
}
