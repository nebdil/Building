import React, { Component } from 'react';
import Building from './Building.jsx';
import User from './User.jsx';
import Post from './Post.jsx';
import Reply from './Reply.jsx';
import Like from './Like.jsx';
import Tag from './Tag.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Navbar from './Navbar.jsx';
import Main from './Main.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CreatePost from './CreatePost.jsx';
import BuildingRegister from './BuildingRegister.jsx';

export default class App extends Component {
  constructor({ props, history }) {
    super(props);
    this.state = {
      currentUserId: 1,
      posts: []
    };
  }
  render() {
    return(
      <div>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/buildings/1/' component={Main}/>
          <Route path='/register' component={Register}/>
          <Route path='/buildings' component={BuildingRegister}/>
        </Switch>
      </div>

    )
  }
}
