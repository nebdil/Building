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
      <Navbar id="navbar">
        <Nav>
          <div class="menu-item" id="left-most-nav">
            <NavItem><Link to={'/buildings/1/users/1'}>My Profile</Link></NavItem>
            <div class="color-div"></div>
          </div>
        </Nav>
        <Navbar.Brand>
          <div id="logo">
            <a href="#">Static Building Logo</a>
          </div>
        </Navbar.Brand>
        <Nav>
          <div class="menu-item" id="second-right-most-nav">
            <NavItem><p>Signed in as 1 - in 3601</p></NavItem>
            <div class="color-div"></div>
          </div>
        </Nav>
        <Nav>
          <div class="menu-item" id="right-most-nav">
            <NavItem onClick={this._handleLogout}><Link to={'/logout'}>Log Out</Link></NavItem>
            <div class="color-div"></div>
          </div>

        </Nav>
      </Navbar>
    )
  }
  _handleLogout(e) {
    e.preventDefault()
    console.log('LOGOUT LOGOUT LOGOUT')
    console.log(e.target)
    // fetch('http://localhost:3000/logout')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     // console.log(responseJson.url)
    //     // console.log(this.props.propS)
    //     // console.log(this.props.propS.history)
    //     this.props.propS.history.push(responseJson.url)
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    console.log(localStorage.getItem('user_token'))
    localStorage.setItem('user_token', null)
    console.log(localStorage.getItem('user_token'))
    this.props.propS.history.push('/login')
  }
}
