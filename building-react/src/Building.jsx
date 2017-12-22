import React, { Component } from 'react';
import Post from './Post.jsx';
// import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import CreatePost from './CreatePost.jsx'
import SendReply from './SendReply.jsx'
import Login from './Login.jsx'
import Navtop from './Navtop.jsx';
import { Panel, Row, Col, Grid } from 'react-bootstrap'
import moment from 'moment'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import classNames from 'classnames'

export default class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      unique_tags: [],
      showReply: false,
      currentPost: '',
      user_token: localStorage.getItem('user_token'),
      user_email: localStorage.getItem('user_email'),
      createContent: '',
      createTag: '',
      selected: false,
      selected_tag: []
      // redirect: '',
      // show: true
    };
    this._handlePostsByTags = this._handlePostsByTags.bind(this)
    this.state.posts.map = this.state.posts.map.bind(this)
    this.setState = this.setState.bind(this)
    this._handleNewPost = this._handleNewPost.bind(this)
    this._handlePostChange = this._handlePostChange.bind(this)
    this._handleLikes = this._handleLikes.bind(this)
    this._handleContent = this._handleContent.bind(this)
    this._handleTag = this._handleTag.bind(this)
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
    // this._hide = this._hide.bind(this)
  }
  componentDidMount() {
    return (fetch(`http://localhost:3000${this.props.match.url}`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let tags = [];
        responseJson.forEach((e) => {
          e.tags.map((t) => {
            tags.push(t.name)
          })
        })
        this.setState({ posts: responseJson, selected_tag: tags })
        console.log("responseJson: " + responseJson)
        console.log(this.props.match)
        console.log(this.props.match.url)
      })
      .catch((error) => {
        console.error(error);
      })
    )
  }
  render() {
    var allPosts = this.state.posts
    var btnClass = classNames({
      'selected': this.state.selected
    })
    if (this.state.user_token === 'null') {
      return (
        <Login />
      )
    } else {
      let shownPosts = [];
      if (this.state.selected_tag.length > 1) {
        //if nothing was selected before
        shownPosts = this.state.posts
      } else {
        //if something was selected before
        if (this.state.selected) {
          //if clicked on a totally different thing
          this.state.posts.forEach((p) => {
            p.tags.map((t) => {
              if (t.name === this.state.selected_tag[0]) {
                shownPosts.push(p)
              }
            })
          })
        } else {
          //if what was selected was the same thing as clicked
          shownPosts = this.state.posts
        }
      }
      return (
        <div className="main">
          <Navtop propS={this.props}/>
          <Grid>
            <Row>
              <Col md={8} className="all-posts">
                <h2>Posts in Your Building</h2>
                <table>
                  <tbody>
                    {
                      shownPosts.map((e) => {
                      const head = (
                        <Row>
                          <Col className="user-name" md={8}>{e.username}</Col>
                          <Col md={4}>{moment(e.created_at).startOf('second').fromNow()}</Col>
                        </Row>
                      );
                      const foot = (
                        <Row>
                          <Col md={4} id="tag-div"><div className="tag-div">{e.tags.map((a) => {return a.name})}</div></Col>
                          <Col md={4}>
                          </Col>
                          <Col md={4}>
                            <Row>
                              <Col className="reply" md={6}>
                                <div className="reply-div">
                                  <Link to={`${this.props.match.url}/${e.id}`} posts={e}><i class="fa fa-comment-o" aria-hidden="true"></i></Link>
                                  <p>{e.reply.length}</p>
                                </div>
                              </Col>
                              <Col className="peace" md={6}>
                                <div className="peace-group">
                                  <Like postId={e.id} likes={e.like} handleLikes={this._handleLikes} likeLength={e.like.length} propS={this.props}/>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      );
                      return(
                        <Panel header={head} footer={foot}>
                          <Link to={`${this.props.match.url}/${e.id}`}>{e.content}</Link>
                        </Panel>
                      )
                    })}
                  </tbody>
                </table>
                {/* <Switch> */}
                  <Route path={`/buildings/:building_id/posts/:id`} render={(props) =>
                    {return(
                      <Post {...props} allPosts={allPosts} handleLikes={this._handleLikes} handleReplyChange={this._handleReplyChange} handleReplySubmit={this._handleReplySubmit} />
                    )}}
                  />
                {/* </Switch> */}
              </Col>
              <Col className="fixed" md={4}>
                <h3>Create a Post</h3>
                <CreatePost currentPosts = {this.state.posts} handleNewPost = {this._handleNewPost} handlePostChange = {this._handlePostChange} handleContent={this._handleContent} handleTag={this._handleTag}/>
                <h3>Filter Posts by Tags</h3>
                <Tag posts={this.state.posts} handlePostsByTags={this._handlePostsByTags} btnClass={btnClass} selectedTag={this.state.selected_tag}/>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }
  }

  //ABOUT LIKES
  _handleLikes(e) {
    console.log('in handle likes')
    if (e.target.className === 'fa fa-heart-o') {
      console.log('in if')
      fetch(`/buildings/${this.props.match.params.building_id}/posts/${e.target.dataset.post}/likes`, {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${localStorage.getItem('user_token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({posts: resJson})
      })
    } else {
      console.log('in else')
      this.state.posts.forEach((p) => {
        p.like.forEach((l) => {
          if (l.post_id == e.target.dataset.post && l.user_id == localStorage.getItem('user_id')) {
            fetch(`/buildings/${this.props.match.params.building_id}/posts/${e.target.dataset.post}/likes/${l.id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
              }
            })
            .then((res) => res.json())
            .then((resJson) => {
              this.setState({posts: resJson})
            })
          }
        })
      })
    }
  }
  //ABOUT TAGS
  _handlePostsByTags(e) {
    e.preventDefault();
    if (this.state.selected_tag.length === 1 && this.state.selected_tag[0] === e.target.value) {
      this.setState({selected: false, selected_tag: [e.target.value]})
    } else {
      this.setState({selected: true, selected_tag: [e.target.value]})
    }
  }
  _handleTag(e) {
    e.preventDefault();
    this.setState({createTag: e.target.value})
  }
  //ABOUT NEW POST
  _handleNewPost(e) {
    e.preventDefault();
    e.target.reset()
    const content = {
      content: this.state.createContent,
      tag: this.state.createTag,
      user_email: localStorage.getItem('user_email')
    }
    fetch(`${this.props.match.url}/`, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((newPost) => {
      const newPostArr = [newPost]
      const posts = newPostArr.concat(this.state.posts)
      this.setState({posts: posts})
    })
  }
  //ABOUT MODAL
  // _hide = () => {
  //   console.log('in hide')
  //   this.setState({
  //     redirect: `${this.props.match.url}`
  //   })
  // }
  //ABOUT REPLY
  _handleReplyChange(e) {
    console.log('in handleReplyChange:', e.target.value);
    this.setState({reply: e.target.value})
  }
  _handleReplySubmit(e) {
    e.preventDefault();
    e.target.reset()

    const obj = {
      reply: this.state.reply
    }

    const repliesPostId = e.currentTarget.getAttribute('data-post-id')

    fetch(`${this.props.match.url}/${repliesPostId}/replies`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({posts: responseJson})
    })
  }



  _handleContent(e) {
    e.preventDefault();
    this.setState({createContent: e.target.value})
  }
  _handlePostChange(e) {
    console.log('in handle change' + e.target.value)
  }
}
