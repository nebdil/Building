import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap'
import classNames from 'classnames'
export default class Navtop extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this)
  }
  render() {
    // console.log('in navbar: ')
    // console.log(this.props.propS.match.params)
    if (this.props.propS.match.path == "/buildings/:building_id/posts") {
      // console.log('in if')
      var building = classNames({
        'page-selected': true
      })
      var user = classNames({
        'page-selected': false
      })
    } else if (this.props.propS.match.path == "/buildings/:building_id/users/:id") {
      // console.log('in else if')
      var building = classNames({
        'page-selected': false
      })
      var user = classNames({
        'page-selected': true
      })
    }
    return (
      <Navbar id="navbar">
        <Grid>
          <Row>
            <Col md={3}>
              <Navbar.Brand>
                <div id="logo">
                  <Link to={`/buildings/${this.props.propS.match.params.building_id}/posts`}><img src={"/building-coral.png"} alt="building" width="30"/><p>BUILDING</p></Link>
                </div>
              </Navbar.Brand>
            </Col>
            <Col md={3}>
              <Nav>
                <div className={`menu-item ${building}`}>
                  <NavItem className="address">
                    <Link to={`/buildings/${this.props.propS.match.params.building_id}/posts`}>
                      <p>{localStorage.getItem('building_address').split(',').slice(0, 2).join(',')}</p>
                    </Link>
                  </NavItem>
                  <div class="color-div"></div>
                </div>
              </Nav>
            </Col>
            <Col md={3}>
              <Nav>
                <div className={`menu-item ${user}`}>
                  <NavItem>
                    <Link to={`/buildings/${this.props.propS.match.params.building_id}/users/${localStorage.getItem('user_id')}`}>
                      {localStorage.getItem('user_username').toUpperCase()}'s Personal Posts
                    </Link>
                  </NavItem>
                  <div class="color-div"></div>
                </div>
              </Nav>
            </Col>
            <Col md={3}>
              <Nav>
                <div class="menu-item" id="right-most-nav">
                  <NavItem onClick={this._handleLogout}><Link to={'/logout'}>Log Out</Link></NavItem>
                  <div class="color-div"></div>
                </div>
              </Nav>
            </Col>
          </Row>
        </Grid>
      </Navbar>
    )
  }
  _handleLogout(e) {
    e.preventDefault()
    // console.log('LOGOUT LOGOUT LOGOUT')
    // console.log(e.target)
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
    window.location.reload()

  }
}
