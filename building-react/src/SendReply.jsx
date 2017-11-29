import React, { Component } from 'react';
import { FormGroup, FormControl, ButtonToolbar, Button, Row, Col } from 'react-bootstrap'

export default class SendReply extends Component {
  render() {

    const handleSubmit = this.props.handleReplySubmit;
    const handleChange = this.props.handleReplyChange;

    return (
      <form onSubmit={handleSubmit} data-post-id = {this.props.postId} id = "post-id">
        <Row>
          <Col>
            <FormGroup bsSize="small">
              <FormControl type="text" name="post_content" placeholder="Your reply" onChange={handleChange}/>
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
}
