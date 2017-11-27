import React, { Component } from 'react';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
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
      originalPosts: [],
      unique_tags: [],
      showReply: false,
      currentPost: '',
      user_token: localStorage.getItem('user_token'),
      user_email: localStorage.getItem('user_email'),
      createContent: '',
      createTag: '',
      selected: '',
      selected_tag: ''
    };
    this._handlePostsByTags = this._handlePostsByTags.bind(this)
    this.state.posts.map = this.state.posts.map.bind(this)
    this.setState = this.setState.bind(this)
    this._handleNewPost = this._handleNewPost.bind(this)
    this._handlePostChange = this._handlePostChange.bind(this)
    this._handleLikes = this._handleLikes.bind(this)
    this._handleContent = this._handleContent.bind(this)
    this._handleTag = this._handleTag.bind(this)
    // this.btnClass = this.btnClass.bind(this)
    // this._handleRoute = this._handleRoute.bind(this)
  }


  componentDidMount() {
    return (fetch(`http://localhost:3000/${this.props.match.url}`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: responseJson, originalPosts: responseJson })
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
    var btnClass = classNames({
      'selected': this.state.selected
    })
    if (this.state.user_token === 'null') {
      return (
        <Login />
      )
    } else {
      return (
        <div className="main">
          <Navtop propS={this.props}/>
          <Grid>
            <Row>
              <Col md={8} className="all-posts">
                <h2>Posts in Your Building</h2>
                <table>
                  <tbody>
                    {this.state.posts.map((e) => {
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
                            {/* <div className="reply-div">
                              <Link to={`/buildings/1/posts/${e.id}`} posts={e}><i class="fa fa-comment-o" aria-hidden="true"></i></Link>
                              {e.reply.length}
                            </div> */}
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
                              {/* {e.like.length} */}
                          </Col>
                        </Row>
                      );
                      return(
                        <Panel header={head} footer={foot}>
                          {/* <a href=`${this.props.match.url}/${e}`>{e.content}</a> */}

                          <Link to={`${this.props.match.url}/${e.id}`} posts={e}>{e.content}</Link>
                          {/* <td><SendReply postId = {e.id} handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} postId={e.id} /></td> */}
                        </Panel>
                      )
                    })}
                  </tbody>
                </table>
                <Switch>
                  <Route path={`/buildings/:building_id/posts/:id`} render={(props) =>
                    {return(
                      <Post {...props} handleLikes={this._handleLikes}/>
                    )}}
                  />
                  {/* <Post handleLikes={this._handleLikes}/> */}

                  {/* <Route path={`/buildings/:building_id/posts/:id`} handleLikes={this._handleLikes} component={Post} /> */}
                </Switch>
              </Col>
              <Col className="fixed" md={4}>
                <h3>Create a Post</h3>
                <CreatePost currentPosts = {this.state.posts} handleNewPost = {this._handleNewPost} handlePostChange = {this._handlePostChange} handleContent={this._handleContent} handleTag={this._handleTag}/>
                <h3>Filter Posts by Tags</h3>
                <Tag posts={this.state.originalPosts} handlePostsByTags={this._handlePostsByTags} isActive={this.isActive} btnClass={btnClass} selectedTag={this.state.selected_tag}/>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    }
  }
  // _handleRoute(e) {
  //   this.props.history.push()
  // }
  _handleLikes(e) {
    console.log('in handle likes')
    this.setState({posts: e, originalPosts: e})
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
      this.setState({posts: newPosts, selected: true, selected_tag: e.target.value})
    } else {
      let a = this.state.posts[0]
      let b = newPosts[0]
      if (a.id === b.id) {
        this.setState({posts: this.state.originalPosts, selected: false, selected_tag: e.target.value})
      } else {
        this.setState({posts: newPosts, selected: true, selected_tag: e.target.value})
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
    e.target.reset()

    console.log('e.target: ' + e.target)
    // const content = {form: new FormData(e.target), user_email: localStorage.getItem('user_email')};
    const content = {
      content: this.state.createContent,
      tag: this.state.createTag,
      user_email: localStorage.getItem('user_email')
    }
    console.log(content)
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
