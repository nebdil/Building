import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

export default class Navtop extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this)
  }

  render() {
    console.log('in navbar: ')
    console.log(this.props.propS.match.params)
    return (
      <Navbar id="navbar">
        <Nav>
          <div class="menu-item" id="left-most-nav">
            <NavItem><Link to={`/buildings/${this.props.propS.match.params.building_id}/users/${localStorage.getItem('user_id')}`}>My Profile</Link></NavItem>
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
            <NavItem><p>Signed in as {localStorage.getItem('user_username')} - in {localStorage.getItem('building_address')}</p></NavItem>
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
    // console.log(localStorage.getItem('user_token'))
    localStorage.setItem('user_token', null)
    localStorage.setItem('user_email', null)
    localStorage.setItem('user_username', null)
    localStorage.setItem('user_id', null)
    localStorage.setItem('building_id', null)
    localStorage.setItem('building_address', null)
    // console.log(localStorage.getItem('user_token'))
    this.props.propS.history.push('/login')
  }
}
