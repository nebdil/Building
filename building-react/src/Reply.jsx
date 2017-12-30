import React from 'react';
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

function Reply(props) {

  return (
    <div>
      <Row>
        <Col md={8}><p className="replier-name">{props.reply.username}</p></Col>
        <Col md={4}><p id="comment-time">{moment(props.reply.created_at).startOf('second').fromNow()}</p></Col>
      </Row>
      <p>{props.reply.content}</p>
    </div>
  )

}

export default Reply;
