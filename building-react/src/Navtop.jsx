import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

export default class Navtop extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this)
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/buildings/1/posts'>
              Home
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>
            <Link to='/buildings/1/users/1'>My Profile</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <span>Static Building Logo</span>
          </NavItem>
          <NavItem eventKey={3}>
            <span>Signed in as 1 - in 3601</span>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to='/logout' onClick={this._handleLogout}>Log Out</Link>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
  _handleLogout(e) {
    e.preventDefault()
    console.log('LOGOUT LOGOUT LOGOUT')
    console.log(e.target)
    fetch('http://localhost:3000/logout')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.url)
        // console.log(this.props.propS)
        // console.log(this.props.propS.history)
        this.props.propS.history.push(responseJson.url)
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
