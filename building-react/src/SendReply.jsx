import React, { Component } from 'react';
import { FormGroup, FormControl, ButtonToolbar, Button, Row, Col } from 'react-bootstrap'

function SendReply(props) {

  return(
    <form onSubmit={props.handleReplySubmit} data-post-id = {props.postId} id = "post-id">
      <Row>
        <Col>
          <FormGroup bsSize="small">
            <FormControl type="text" name="post_content" placeholder="Your reply" onChange={props.handleReplyChange}/>
          </FormGroup>
        </Col>
        <Col>
          <ButtonToolbar>
            <Button bsSize="xsmall" type="submit" id="send-reply-btn">Reply</Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </form>
  )

}

export default SendReply;
