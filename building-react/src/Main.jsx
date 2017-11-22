import React, { Component } from 'react';
import Navtop from './Navtop.jsx';
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
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Navtop propS={this.props}/>
        <Switch>
          <Route path='/buildings/1/users/1' component={User}/>
          <Route path='/buildings/1/posts' component={Building}/>
        </Switch>
      </div>
    )
  }
}
