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
      user_token: localStorage.getItem('user_token'),
      buildings: []
    }
  }
  componentDidMount() {
    // buildings controller index
    return (fetch(`http://localhost:3000${this.props.match.url}`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson from main: ', responseJson)
        this.setState({ buildings: responseJson })
      })
      .catch((error) => {
        console.error(error);
      })
    )
  }
  render() {
    if (this.state.user_token === 'null') {
      return (
        <Login />
      )
    } else {
      return (
        <div>
            <Switch>
              <Route path='/buildings/:building_id/users/:id' component={User}/>
              <Route path='/buildings/:building_id/posts' component={Building}/>
            </Switch>
        </div>
      )
    }
  }
}
