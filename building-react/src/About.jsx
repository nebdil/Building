import React, { Component } from 'react';
import { Jumbotron, Button, Row , Col} from 'react-bootstrap'
import {
  Link,
  Redirect,
  Switch,
  Route
} from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'

export default class About extends Component {
  render(){
    return(
      <Jumbotron>
        <Col>
          <Row>Welcome to Building!</Row>
          <Row>... where you can connect with your neighbors.</Row>
          <Row>
            {/* <Button bsStyle="primary" className="login-btn">
              Login
            </Button> */}
            <Link to={'/login'}>Login</Link>
            {/* <Button bsStyle="primary" className="login-btn">
              Sign Up
            </Button> */}
            <Link to={'/register'}>Register</Link>
          </Row>
        </Col>
        <Switch>
          <Route path={`/login`} component={Login}/>
          <Route path={`/register`} component={Register}/>
        </Switch>
      </Jumbotron>
    )
  }
}
