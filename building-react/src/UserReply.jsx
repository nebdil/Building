import React, { Component } from 'react';
import UserReplyReply from './UserReplyReply.jsx';
import SendReply from './SendReply.jsx';
import Like from './Like.jsx';
import Post from './Post.jsx';
import { Panel, Row, Col, Grid } from 'react-bootstrap'
import moment from 'moment'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

export default class UserReply extends Component {
  constructor() {
    super();
    this.state = {
      showReply: false
    }
  }
  onClick(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply})
  }

  render() {
    const post = this.props.currentUserReplies.content;
    const postId = this.props.currentUserReplies.id;
    const user = this.props.currentUserReplies.username;
    const time = this.props.currentUserReplies.created_at;
    const replySize = this.props.currentUserReplies.reply.length;
    const likeSize = this.props.currentUserReplies.like.length;
    const like = this.props.currentUserReplies.like;
    const head = (
      <Row>
        <Col className="user-name" md={8}>{user}</Col>
        <Col md={4}>{moment(time).startOf('second').fromNow()}</Col>
      </Row>
    );
    const foot = (
      <Row>
        <Col md={4} id="tag-div">
          <div className="tag-div">
            {this.props.currentUserReplies.tags.map((a) =>
                      {return a.name})}
          </div>
        </Col>
        <Col md={4}></Col>
        <Col md={4}>
          <Row>
            <Col className="reply" md={6}>
              <div className="reply-div">
                <Link to={`#`}><i className="fa fa-comment-o" aria-hidden="true"></i></Link>
                <p>{replySize}</p>
              </div>
            </Col>
            <Col className="peace" md={6}>
              <div className="peace-group">
                <Like postId={postId} likes={like} likeLength={likeSize} handleLikes={this.props.handleLikes} current_user={this.props.current_user}/>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );

    return (
      <div>
        <table>
          <tbody>
            <Panel header={head} footer={foot}>
              <Link to={`/buildings/${this.props.current_user.building_id}/posts/${postId}`}>{post}</Link>
            </Panel>
          </tbody>
        </table>
        {this.state.showReply && this.props.currentUserReplies.reply.map(function(e) {
          return <UserReplyReply currentUserReplyReplies = {e} key = {e.id}/>
        })}
        {/* <Switch> */}
          <Route path={`/buildings/${this.props.current_user.building_id}/posts/${postId}`} render={(props) =>
            {return(
              <Post {...props}/>
            )}}/>
        {/* </Switch> */}
      </div>
    )
  }
}
