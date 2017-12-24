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
      buildings: [],
      b_address: '',
      b_id: ''
    }
    this._handleLogout = this._handleLogout.bind(this)
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
        // to hold the address temporarily, cannot set state in an if/forEach - gets in a loop
        let address = '';
        let id = '';
        responseJson.forEach((b) => {
          // buildings that come from rails is an array
          for (let key in b) {
            // each building is an obj, so have to access the id because cannot get building id from params, since there is no params in main.jsx
            if(`/buildings/${b[key]}/posts` === this.props.location.pathname) {
              address = b.address;
              id = b.id;
            }
          }
        })
        this.setState({
          buildings: responseJson,
          b_address: address,
          b_id: id
        })
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
          <Navtop url={this.props.location.pathname} b_address={this.state.b_address} b_id={this.state.b_id} handleLogout={this._handleLogout}/>
            <Switch>
              <Route path='/buildings/:building_id/users/:id' component={User}/>
              <Route path='/buildings/:building_id/posts' component={Building}/>
            </Switch>
        </div>
      )
    }
  }
  _handleLogout(e) {
    e.preventDefault();
    this.props.history.push('/login');
  }
}
