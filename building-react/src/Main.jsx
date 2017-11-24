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
    return (fetch(`http://localhost:3000/buildings/`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ buildings: responseJson })
        console.log(responseJson)
        console.log(this.props.match.params)
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
          <Navtop propS={this.props}/>
            <Switch>
              <Route path='/buildings/:id/users/1' component={User}/>
              <Route path='/buildings/:id/posts' component={Building}/>
            </Switch>
        </div>
      )
    }
  }
}
