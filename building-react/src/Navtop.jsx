import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap'
import classNames from 'classnames'

function Navtop(props) {
  console.log('AA IN THE NEW NAVTOP')
  console.log('innav:', props)
  return(
    <Navbar id="navbar">
      <Grid>
        <Row>
          <Col md={3}>
            <Navbar.Brand>
              <div id="logo">
                <Link to={props.url}>
                  <img src={"/building-coral.png"} alt="building" width="30"/>
                  <p>
                    BUILDING
                  </p>
                </Link>
             </div>
           </Navbar.Brand>
         </Col>
         <Col md={3}>
           <Nav>
             {/* <div className={`menu-item ${building}`}> */}
               <NavItem className="address">
                 <Link to={props.url}>
                   <p>{props.b_address.split(',').slice(0, 2).join(',')}</p>
                 </Link>
               </NavItem>
               <div class="color-div"></div>
             {/* </div> */}
           </Nav>
         </Col>
         <Col md={3}>
           <Nav>
             {/* URL NO GOOD */}
             {/* <div className={`menu-item ${user}`}> */}
               <NavItem>
                 <Link to={`/buildings/${props.b_id}/users/${localStorage.getItem('user_id')}`}>
                   {localStorage.getItem('user_username').toUpperCase()}'s Personal Posts
                 </Link>
               </NavItem>
               <div class="color-div"></div>
             {/* </div> */}
           </Nav>
         </Col>
           <Col md={3}>
             <Nav>
               <div class="menu-item" id="right-most-nav">
                 <NavItem onClick={props.handleLogout}>
                  <Link to={'/logout'}>
                    Log Out
                  </Link>
                 </NavItem>
                 <div class="color-div"></div>
               </div>
             </Nav>
           </Col>
        </Row>
      </Grid>
    </Navbar>
  )
}

export default Navtop;
