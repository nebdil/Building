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
  constructor(props) {
    super(props)
    this.state = {
      proPS: '',
      showModal: false
    }
    this._handleLogin = this._handleLogin.bind(this)
    this._handleRegister = this._handleRegister.bind(this)
  }

  componentDidMount() {
    this.setState({proPS: this.props.propS})
  }
  render(){
    console.log('in about')
    console.log(this.state.proPS)
    console.log(this.props.propS.history)
    return(


    <Jumbotron>
      <Col md={3}></Col>
      <Col md={6}>
        <Row><h1>Welcome to Building!</h1></Row>
        <Row><h3>... where you can connect with your neighbors.</h3></Row>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Button bsStyle="primary" className="login-btn" onClick={this._handleLogin}>
              Login
            </Button>
            <Button bsStyle="primary" className="login-btn" onClick={this._handleRegister} >
              Sign Up
            </Button>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Col>
      <Col md={3}></Col>
      <Switch>
        <Route path={`/login`} render={(props) => {return(
          <Login {...props} show={this.state.showModal}/>
        <Route path={`/register`} render={(props) =>
          {return(
            <Register {...props}/>
          )}}
        />
      </Switch>
    </Jumbotron>
  )

  }
  _handleLogin(e) {
    console.log('in handle login')
    console.log(this.state.proPS)
    this.props.propS.history.push('/login')
  }
  _handleRegister(e) {
    this.props.propS.history.push('/register')
  }
  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  }
}
