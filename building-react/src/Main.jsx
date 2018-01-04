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
      b_id: '',
      current_user: '',
      current_building: ''
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
        console.log('responseJson:', responseJson)
        // to hold the address temporarily, cannot set state in an if/forEach - gets in a loop
        let address = '';
        let id = '';
        let user = '';
        let building = '';
        let buildings = '';

        responseJson.forEach((res) => {
          // response that comes from rails is an array
          if (res.current_user) {
            //assign the current user
            user = res.current_user
            // assign the building we get from rails
          } else if (res.buildings) {
            buildings = res.buildings
          }
        })

        buildings.forEach((b) => {
          // buildings is an array, now we have to access the current building
          // current building id is already in the current user
          if (b.id === user.building_id) {
            id = b.id;
            address = b.address;
            building = b
          }
        })
        // set the state with the info that we're going to send to the NAVTOP
        this.setState({
          buildings: buildings,
          b_address: address,
          b_id: id,
          current_user: user,
          current_building: building
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
          <Navtop url={this.props.location.pathname} current_building={this.state.current_building} handleLogout={this._handleLogout} current_user={this.state.current_user}/>
            <Switch>
              {/* <Route path='/buildings/:building_id/users/:id' component={User}/> */}
              <Route path='/buildings/:building_id/users/:id' render={(props) =>
                {return(
                  <User {...props} current_user={this.state.current_user} />
                )}} />
              {/* <Route path='/buildings/:building_id/posts' component={Building}/> */}
              <Route path={'/buildings/:building_id/posts'} render={(props) =>
                {return(
                  <Building {...props} current_user={this.state.current_user} />
                )}} />
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
