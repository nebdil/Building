import React, { Component } from 'react';
import { Jumbotron, Button, Row , Col, PageHeader} from 'react-bootstrap'
import {
  Link,
  Redirect,
  Switch,
  Route
} from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'

export default class About extends Component {

  componentDidMount() {
    this.props._handleAbout
  }

  render(){
    console.log('in about', 'the props are: ', this.props)
    return(
    <Jumbotron>
      <Col md={3}></Col>
      <Col md={6}>
        <Row><h1 id="project-name">BUILDING</h1></Row>
        <Row><h2>We connect you with your neighbors.</h2></Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Button bsStyle="primary" id="login-btn" className="login-btn" onClick={this.props._handleLogin}> {/* redirects to Login */}
              Login
            </Button>
            <Button bsStyle="primary" id="register-btn" className="login-btn" onClick={this.props._handleRegister} > {/* redirects to History */}
              Register
            </Button>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Col>
      <Col md={3}></Col>
      <Switch>
        <Route path={`/login`} component={Login}/>
        <Route path={`/register`} render={(props) =>
          {return(
            <Register {...props}/>
          )}}
        />
      </Switch>
    </Jumbotron>
    )
  }

}
