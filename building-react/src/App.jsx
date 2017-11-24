import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login.jsx';
import Register from './Register.jsx';
import Navtop from './Navtop.jsx';
import Main from './Main.jsx';
import BuildingRegister from './BuildingRegister.jsx';

export default class App extends Component {
  constructor({ props, history }) {
    super(props);
    this.state = {
      // currentUserId: 1,
      // posts: []
    };
  }
  render() {
    return(
      <div>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/buildings/' component={Main}/>
          <Route path='/register' component={Register}/>
          <Route path='/buildings' component={BuildingRegister}/>
        </Switch>
      </div>
    )
  }
}
