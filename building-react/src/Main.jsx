import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import Building from './Building.jsx';
import User from './User.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CreatePost from './CreatePost.jsx';


export default class Main extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/buildings/1/users/1' component={User}/>
          <Route path='/buildings/1/posts' component={Building}/>
        </Switch>
      </div>
    )
  }
}
