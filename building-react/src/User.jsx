import React, { Component } from 'react';
import UserPost from './UserPost.jsx';
import UserReply from './UserReply.jsx';
import Login from './Login.jsx';
import Navtop from './Navtop.jsx';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Panel, Row, Col, Grid } from 'react-bootstrap'
import moment from 'moment'

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user_token: localStorage.getItem('user_token')
    };
    this.setState = this.setState.bind(this)
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
    this._handleLikes = this._handleLikes.bind(this)
  }

  componentDidMount() {
    return fetch(`http://localhost:3000${this.props.match.url}`,
  {
    headers: {
      'Authorization': `bearer ${localStorage.getItem('user_token')}`
    }
  })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson })
        console.log('in user')
        console.log(this.props.match)
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    if (this.state.user_token === 'null') {
      return (
        <Login />
      )
    } else {
    return (
      <div>
        <Navtop propS={this.props}/>
        {/* <Link to={`/buildings/${this.props.match.params.building_id}/posts`}>Go back</Link> */}
        <div className="all-posts">
          <Grid>
            <Row>
              <p>Your posts</p>
            </Row>
            <Row>
                {this.state.posts.map((e) => {
                  if (!(e.hasOwnProperty('posts_user_replied_to'))) {
                    return (
                      <UserPost handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} currentUserPosts = {e} key = {e.id} propS={this.props.match} handleLikes={this._handleLikes}/>
                    )
                  }
                })}
            </Row>
            <Row>
              <p>Posts you've commented</p>
            </Row>
            <Row>
                {this.state.posts.map((e) => {
                  if (e.hasOwnProperty('posts_user_replied_to')) {
                    return (
                      e.posts_user_replied_to.map((el) => {
                        if (el.user_id != this.props.match.params.id) {
                          return (
                            <UserReply handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} currentUserReplies = {el} key = {el.id} propS={this.props.match} handleLikes={this._handleLikes}/>
                          )
                          }
                        }
                      )
                    )
                  }
                })}
            </Row>
          </Grid>
        </div>
      </div>
    )
  }}

  _handleLikes(e) {
    console.log('in user handle likes')
    this.setState({posts:e})
  }

  _handleReplyChange(e) {
    console.log('in handleReplyChange:', e.target.value);
  }

  _handleReplySubmit(e) {
    e.preventDefault();
    console.log("hello", e.currentTarget)
    const content = new FormData(e.currentTarget);
    const repliesPostId = e.currentTarget.getAttribute('data-post-id')
    console.log(repliesPostId);
    this.state.posts.forEach((post) => {
      console.log(post.id, repliesPostId)
      if (post.id == repliesPostId) {
        console.log('we got a match, post:', post);
        fetch(`http://localhost:3000/buildings/${this.props.match.params.building_id}/posts/${post.id}/replies`, {
          method: 'POST',
          body: content,
          headers: {
            'Authorization': `bearer ${localStorage.getItem('user_token')}`
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          const replies = post.reply.push(responseJson)
          this.setState({posts: this.state.posts})
        })
      } else if (post.hasOwnProperty("posts_user_replied_to")) {
        console.log("inside the posts_user_replied_to");
        console.log(post);
        post.posts_user_replied_to.forEach((rpost) => {
          console.log(rpost, repliesPostId)
          if (rpost.id == repliesPostId) {
            console.log('we got a match, post:', post);
            fetch(`http://localhost:3000/buildings/${this.props.match.params.building_id}/posts/${rpost.id}/replies`, {
              method: 'POST',
              body: content,
              headers: {
                'Authorization': `bearer ${localStorage.getItem('user_token')}`
              }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              const replies = rpost.reply.push(responseJson)
              this.setState({posts: this.state.posts})
            })
          }
        })
      }
    })
  }

}
