import React, { Component } from 'react';
import Navtop from './Navtop.jsx';
import Building from './Building.jsx';
import User from './User.jsx';
import Login from './Login.jsx';
import { Route, Switch } from 'react-router-dom'

export default class Main extends Component {
  constructor({props, history}) {
    super(props);
    this.state = {
      user_token: localStorage.getItem('user_token')
    }
  }

  render() {
    if (this.state.user_token === 'null') {
      return (
        <Login />
      )
    } else {
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
}
