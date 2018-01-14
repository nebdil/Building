import React, { Component } from 'react';

export default class BuildingRegister extends Component {
  constructor({ props, history }) {
    super(props);
    this._handleAddress = this._handleAddress.bind(this)
    // this._handleBuildingRegister = this._handleBuildingRegister.bind(this)
    // this.initAutocomplete = this.initAutocomplete.bind(this)
  }

  componentDidMount() {
    window.addEventListener('load', this.props.initAutocomplete);
  }

  render() {
    return(
      <div>
        <input type="text" name="address" id="pac-input" className="controls" placeholder="address" onChange={this._handleAddress} />
        <div id="map"></div>
      </div>
    )
  }

  _handleAddress(e) {
    console.log(e.target.value)
  }

  // _handleBuildingRegister(e) {
  //   // const obj = {
  //   //   address: this.state.address
  //   // }
  //   // console.log(obj)
  //   e.preventDefault()
  //   console.log('BUILDING BUILDING BUILDING')
  //
  //   // const data = new FormData(e.target);
  //   // console.log('data: ' + data)
  //   fetch('/buildings', {
  //     method: 'POST',
  //     // body: data
  //     body: JSON.stringify(obj),
  //     headers: {
  //     // 'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': `bearer ${localStorage.getItem('user_token')}`
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(responseJson)
  //     this.props.history.push(responseJson.url)
  //   })
  // }

  // initAutocomplete() {
  //   const input = document.getElementById('pac-input');
  //   const searchBox = new window.google.maps.places.SearchBox(input);
  //   searchBox.addListener('places_changed', function() {
  //     const places = searchBox.getPlaces()
  //     if (places.length == 0) {
  //       return;
  //     }
  //     console.log(places[0].formatted_address);
  //   });
  // }

}
