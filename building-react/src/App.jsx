import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './Login.jsx';
import Register from './Register.jsx';
import Main from './Main.jsx';
import BuildingRegister from './BuildingRegister.jsx';
import Animation from './Animation.jsx';

export default class App extends Component {

  render() {
    return(
      <div>
        <Switch>
          <Route exact path='/' component={Animation} />
          <Route path='/login' component={Login} />
          <Route path='/buildings/' component={Main}/>
          <Route path='/register' component={Register}/>
          <Route path='/buildings' component={BuildingRegister}/>
        </Switch>
      </div>
    )
  }
}
