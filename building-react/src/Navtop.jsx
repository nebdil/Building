import React from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap'
import classNames from 'classnames'

function Navtop(props) {
// navbar css, when clicked, link should be underlined
  var building;
  var user;
  if (props.url === `/buildings/${props.current_building.id}/posts`) {
      building = classNames({
        'page-selected': true
      })
      user = classNames({
        'page-selected': false
      })
  } else if (props.url === `/buildings/${props.current_building.id}/users/${props.current_user.id}`) {
    building = classNames({
      'page-selected': false
    })
    user = classNames({
      'page-selected': true
    })
  }


  // if the states have been set in Main.jsx, load the navbar
  if (props.current_user) {
    return(
      <Navbar id="navbar">
        <Grid>
          <Row>
            <Col md={3}>
              <Navbar.Brand>
                <div id="logo">
                  <Link to={`/buildings/${props.current_building.id}/posts`}>
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
               <div className={`menu-item ${building}`}>
                 <NavItem className="address">
                   <Link to={`/buildings/${props.current_building.id}/posts`}>
                     <p>{props.current_building.address.split(',').slice(0, 2).join(',')}</p>
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
                   <Link to={`/buildings/${props.current_building.id}/users/${props.current_user.id}`}>
                     {props.current_user.username}'s Personal Posts
                   </Link>
                 </NavItem>
                 <div class="color-div"></div>
               </div>
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
  } else {
    // if the states have NOT been set in Main.jsx, say 'loading'
    return (
      <div>LOADING</div>
    )
  }
}

export default Navtop;
