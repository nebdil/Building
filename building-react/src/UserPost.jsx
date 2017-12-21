import React, { Component } from 'react';
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

function UserPost(props) {
  const allPosts = props.allPosts
  const head = (
      <Row>
        <Col className="user-name" md={8}>
          {props.post.username}
        </Col>
        <Col md={4}>
          {moment(props.post.created_at).startOf('second').fromNow()}
        </Col>
      </Row>
  );

  const foot = (
    <Row>
      <Col md={4} id="tag-div">
        <div className="tag-div">
          {props.post.tags.map((t) =>
                    {return t.name})}
        </div>
      </Col>
      <Col md={4}></Col>
      <Col md={4}>
        <Row>
          <Col className="reply" md={6}>
            <div className="reply-div">
              <Link to={`#`}><i class="fa fa-comment-o" aria-hidden="true"></i></Link>
              <p>{props.post.reply.length}</p>
            </div>
          </Col>
          <Col className="peace" md={6}>
            <div className="peace-group">
              <Like postId={props.post.id} likes={props.post.like} likeLength={props.post.like.length}/>
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
            <Link to={`/buildings/${props.propS.params.building_id}/posts/${props.post.id}`}>
              {props.post.content}
            </Link>
          </Panel>
        </tbody>
      </table>
      {/* <Switch> */}
        <Route path={`/buildings/${props.propS.params.building_id}/posts/${props.post.id}`} render={(props) => {
          return(
            <Post {...props} allPosts={allPosts}/>
          )
        }}/>
      {/* </Switch> */}
    </div>
  )
}

export default UserPost;
