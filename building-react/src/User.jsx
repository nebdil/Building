import React, { Component } from 'react';
import UserPost from './UserPost.jsx';
import UserReply from './UserReply.jsx';
import Login from './Login.jsx';
import Navtop from './Navtop.jsx';
import Like from './Like.jsx';
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
      building_id: this.props.current_user.building_id
    };
    this._handlePanel = this._handlePanel.bind(this)
    // this._handleReplySubmit = this._handleReplySubmit.bind(this)
    // this._handleReplyChange = this._handleReplyChange.bind(this)
    // this._handleLikes = this._handleLikes.bind(this)
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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log('in render')
    if (localStorage.getItem('user_token') === 'null') {
      return (
        <Login />
      )
    } else if (this.state.posts) {
      console.log(this.state.posts)
      this.state.posts.forEach((p) => {
        p.reply.forEach((r) => {
          console.log('reply user id:', r.user_id)
          if (r.user_id === this.props.current_user.id) {
            console.log('got a match')
          }
        })
      })
      return (
        <div>
          <div className="all-posts">
            <Grid>
              <Row>
                <Col md={6}>
                  <h3>Your posts</h3>
                  {
                    this.state.posts.map((p) => {
                      if (p.user_id === this.props.current_user.id) {
                        return (this._handlePanel(p))
                      }
                    })
                  }
                </Col>
                <Col md={6}>
                  <h3>Posts You've Commented on</h3>
                  {
                    this.state.posts.map((p) => {
                      return (
                        p.reply.map((r) => {
                          console.log('reply user id:', r.user_id)
                          if (r.user_id === this.props.current_user.id) {
                            console.log('got a match')
                            return (this._handlePanel(p))
                            // return (
                            //   <div>Dilan</div>
                            // )
                          }
                        })
                      )
                    })
                  }
                  {/* {
                  arr.map((e) => {
                    return (
                      <UserReply handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} currentUserReplies = {e} key = {e.id} handleLikes={this._handleLikes} current_user={this.props.current_user}/>
                    )
                  })
                  } */}
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      )
    }
  }

  _handlePanel(e) {
    console.log('in handle Panel')
    console.log(e)
    const head = (
        <Row>
          <Col className="user-name" md={8}>
            {e.username}
          </Col>
          <Col md={4}>
            {moment(e.created_at).startOf('second').fromNow()}
          </Col>
        </Row>
    );
    const foot = (
      <Row>
        <Col md={4} id="tag-div">
          <div className="tag-div">
            {e.tags.map((t) =>
                      {return t.name})}
          </div>
        </Col>
        <Col md={4}></Col>
        <Col md={4}>
          <Row>
            <Col className="reply" md={6}>
              <div className="reply-div">
                <Link to={`#`}><i class="fa fa-comment-o" aria-hidden="true"></i></Link>
                <p>{e.reply.length}</p>
              </div>
            </Col>
            <Col className="peace" md={6}>
              <div className="peace-group">
                <Like postId={e.id} likes={e.like} likeLength={e.like.length} current_user={this.props.current_user.id}/>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
    return (
      <Panel header={head} footer={foot}>
        <Link to={`/buildings/${this.state.building_id}/posts/${e.id}`}>
          {e.content}
        </Link>
      </Panel>
    )
  }



  // _handleLikes(e) {
  //   console.log('in user handle likes')
  //   this.setState({posts:e})
  // }
  //
  // _handleReplyChange(e) {
  //   console.log('in handleReplyChange:', e.target.value);
  // }
  //
  // _handleReplySubmit(e) {
  //   e.preventDefault();
  //   console.log("hello", e.currentTarget)
  //   const content = new FormData(e.currentTarget);
  //   const repliesPostId = e.currentTarget.getAttribute('data-post-id')
  //   console.log(repliesPostId);
  //   this.state.posts.forEach((post) => {
  //     console.log(post.id, repliesPostId)
  //     if (post.id == repliesPostId) {
  //       console.log('we got a match, post:', post);
  //       fetch(`http://localhost:3000/buildings/${this.props.match.params.building_id}/posts/${post.id}/replies`, {
  //         method: 'POST',
  //         body: content,
  //         headers: {
  //           'Authorization': `bearer ${localStorage.getItem('user_token')}`
  //         }
  //       })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         console.log(responseJson)
  //         const replies = post.reply.push(responseJson)
  //         this.setState({posts: this.state.posts})
  //       })
  //     } else if (post.hasOwnProperty("posts_user_replied_to")) {
  //       console.log("inside the posts_user_replied_to");
  //       console.log(post);
  //       post.posts_user_replied_to.forEach((rpost) => {
  //         console.log(rpost, repliesPostId)
  //         if (rpost.id == repliesPostId) {
  //           console.log('we got a match, post:', post);
  //           fetch(`http://localhost:3000/buildings/${this.props.match.params.building_id}/posts/${rpost.id}/replies`, {
  //             method: 'POST',
  //             body: content,
  //             headers: {
  //               'Authorization': `bearer ${localStorage.getItem('user_token')}`
  //             }
  //           })
  //           .then((response) => response.json())
  //           .then((responseJson) => {
  //             console.log(responseJson)
  //             const replies = rpost.reply.push(responseJson)
  //             this.setState({posts: this.state.posts})
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

}
