import React, { Component } from 'react';
import Dialog from './Dialog'
import SendReply from './SendReply.jsx'
import Reply from './Reply.jsx'
import Like from './Like.jsx'
import { Panel, Row, Col, ListGroup, ListGroupItem, ButtonToolbar, Button, Grid} from 'react-bootstrap'
import moment from 'moment'

function Post(props) {
  console.log(props.match)
  let postId = props.match.params.id || null;
  let show = true;
  let redirect = '';
  console.log(props)
  console.log('allpost: ', props.allPosts)
  let post = props.allPosts.filter((e) => e.id == postId)[0]
  let tags = post.tags.map((e) => e.name);

  let _hide = () => {
    show = false;
    redirect = `/buildings/${props.match.params.building_id}/posts`;
    props.history.push(redirect)
  }

  const title = (
    <div id="mdl-header">
      <Row className="modal-first-row">
        <Col className="user-name" md={8}>
          <p>{post.username}</p>
        </Col>
        <Col className="modal-time" md={4}>
          <p>{moment(post.created_at).startOf('second').fromNow()}</p>
        </Col>
      </Row>
      <Row>
        <Col className="modal-cntnt" md={12}>
          {post.content}
        </Col>
      </Row>
      <Row>
        <Col md={4} id="tag-div"><div className="tag-div">{tags}</div></Col>
        <Col md={4}></Col>
        <Col md={4}>
          <Col md={6}></Col>
          <Col className="peace" md={6}>
            <div className="peace-group">
              <Like postId={postId} likes={post.like} handleLikes={props.handleLikes} likeLength={post.like.length} />
            </div>
          </Col>
        </Col>
      </Row>
    </div>
    );

  const foot = (
    <Row>
      <Col id="send-reply" md={12}>
         <SendReply postId = {postId} handleReplyChange = {props.handleReplyChange} handleReplySubmit = {props.handleReplySubmit} />
      </Col>
    </Row>
  );

  return (
    <Dialog
      show={show}
      onHide={_hide}
      title={title}
      footer={foot}>
      {post.reply.map((e) => {return (
        <ListGroup fill>
          <ListGroupItem>
            <Reply reply={e}/>
          </ListGroupItem>
        </ListGroup>
      )})}
    </Dialog>
  )

}

export default Post;
