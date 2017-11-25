import React, { Component } from 'react';
import UserPostReply from './UserPostReply.jsx';
import SendReply from './SendReply.jsx';
import Like from './Like.jsx';
import Post from './Post.jsx';
import { Panel, Row, Col, Grid, Button, ButtonToolbar } from 'react-bootstrap'
import moment from 'moment'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'


export default class UserPost extends Component {
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

    const handleReplyChange = this.props.handleReplyChange;
    const handleReplySubmit = this.props.handleReplySubmit;
    const post = this.props.currentUserPosts.content;
    const postId = this.props.currentUserPosts.id;
    const user = this.props.currentUserPosts.username;
    const time = this.props.currentUserPosts.created_at;
    const replySize = this.props.currentUserPosts.reply.length;
    const likeSize = this.props.currentUserPosts.like.length;
    const head = (
        <Row>
          <Col md={8}>
            {user}
            {/* {user}: {post} */}
          </Col>
          <Col md={4}>
            {moment(time).startOf('second').fromNow()}
          </Col>
        </Row>
    );
    const foot = (
      <Row>
        <Col md={4}>
          {this.props.currentUserPosts.tags.map((a) =>
                    {return a.name})}
        </Col>
        <Col md={4}>
          {replySize}
        </Col>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <Like postId={postId}/>
            </Col>
            <Col md={6}>
              {likeSize}
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
              <Link to={`/buildings/${this.props.propS.params.building_id}/posts/${postId}`}>{post}
              </Link>
            </Panel>
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
              <td>{post}</td> */}
              {/* <td>{user}</td> */}
              {/* <td>{time}</td> */}
              {/* <td>{replySize}</td> */}
              {/* <td><SendReply postId = {postId} handleReplyChange = {handleReplyChange} handleReplySubmit = {handleReplySubmit} /></td> */}
              {/* <td>{likeSize}</td> */}
              {/* <td><Like postId={postId}/></td> */}
            {/* </tr> */}
          </tbody>
        </table>
        <Switch>
          <Route path={`/buildings/${this.props.propS.params.building_id}/posts/${postId}`} render={(props) => {return(<Post {...props}/>)}}/>
        </Switch>
        {this.state.showReply && this.props.currentUserPosts.reply.map(function(e) {
          return <UserPostReply currentUserReplies = {e} key = {e.id}/>
        })}
      </div>
    )
  }
}
