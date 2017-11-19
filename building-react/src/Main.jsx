import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import Building from './Building.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CreatePost from './CreatePost.jsx';
import User from './User.jsx'

export default class Main extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/buildings/5/users/13' component={User}/>
          <Route path='/buildings/5/posts' component={Building}/>
        </Switch>
      </div>
    )
  }
}
