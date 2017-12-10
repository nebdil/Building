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

    // console.log('inside UserReply')
    // console.log(this.props.propS)
    const handleReplyChange = this.props.handleReplyChange;
    const handleReplySubmit = this.props.handleReplySubmit;
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
                <Link to={`#`}><i class="fa fa-comment-o" aria-hidden="true"></i></Link>
                <p>{replySize}</p>
              </div>
            </Col>
            <Col className="peace" md={6}>
              <div className="peace-group">
                <Like postId={postId} likes={like} likeLength={likeSize} propS={this.props} handleLikes={this.props.handleLikes}/>
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
            {/* <tr>
              <th>POST</th>
              <th>USER</th>
              <th>TIME</th>
              <th onClick={this.onClick.bind(this)}>REPLY SIZE</th>
              <th>REPLY BUTTON</th>
              <th>LIKE SIZE</th>
              <th>LIKE BUTTON</th>
              <th>TAG</th>
            </tr> */}
            {/* <tr>
              <td>{post}</td>
              <td>{user}</td>
              <td>{time}</td>
              <td>{replySize}</td>
              <td><SendReply postId = {postId} handleReplyChange = {handleReplyChange} handleReplySubmit = {handleReplySubmit} /></td>
              <td>{likeSize}</td>
              <td><Like postId={postId}/></td>
              {this.props.currentUserReplies.tags.map(function(e) {
                return <td>{e.name}</td>
              })}
            </tr> */}
            <Panel header={head} footer={foot}>
              <Link to={`/buildings/${this.props.propS.params.building_id}/posts/${postId}`}>{post}</Link>
            </Panel>
          </tbody>
        </table>
        <Switch>
          <Route path={`/buildings/${this.props.propS.params.building_id}/posts/${postId}`} render={(props) => {return(<Post {...props}/>)}}/>
        </Switch>
        {this.state.showReply && this.props.currentUserReplies.reply.map(function(e) {
          return <UserReplyReply currentUserReplyReplies = {e} key = {e.id}/>
        })}
      </div>
    )
  }
}
