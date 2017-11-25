import React, { Component } from 'react';
import { Jumbotron, Button, Row , Col} from 'react-bootstrap'

export default class About extends Component {
  render(){
    return(
      <Jumbotron>
        <Col>
          <Row>Welcome to Building!</Row>
          <Row>... where you can connect with your neighbors.</Row>
          <Row>
            <Button bsStyle="primary" className="login-btn">
              Login
            </Button>
            <Button bsStyle="primary" className="login-btn">
              Sign Up
            </Button>
          </Row>
        </Col>
      </Jumbotron>
    )
  }
}
