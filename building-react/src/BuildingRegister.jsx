// import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch
// } from 'react-router-dom'
//
//
// export default class BuildingRegister extends Component {
//   constructor({ props, history }) {
//     super(props);
//     this.state = {
//       street_no: '',
//       street_name: '',
//       city: '',
//       province: '',
//       postal_code: '',
//       country: ''
//     };
//     this._handleStreetNo = this._handleStreetNo.bind(this)
//     this._handleStreetName = this._handleStreetName.bind(this)
//     this._handleCity = this._handleCity.bind(this)
//     this._handleProvince = this._handleProvince.bind(this)
//     this._handleCountry = this._handleCountry.bind(this)
//     this._handlePostalCode = this._handlePostalCode.bind(this)
//     this._handleBuildingRegister = this._handleBuildingRegister.bind(this)
//   }
//
//   import React, { Component } from 'react';
//   import Post from './Post.jsx';
//   import Reply from './Reply.jsx';
//   import Like from './Like.jsx';
//   import Tag from './Tag.jsx';
//   import CreatePost from './CreatePost.jsx'
//   import {
//     BrowserRouter as Router,
//     Route,
//     Link
//   } from 'react-router-dom'
//
//   componentDidMount() {
//     return fetch('http://localhost:3000/buildings/1')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({ posts: responseJson, originalPosts: responseJson })
//       })
//       .then(() => {
//         let newArr = [];
//         this.state.posts.map(function(e) {
//           e.tags.map(function(a) {
//             newArr.push(a.name)
//           })
//         })
//         this.setState({unique_tags: [...new Set(newArr)]})
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
//
//
//   // componentDidMount: function() {
//   //     var input = document.getElementById('searchTextField');
//   //     var options = {componentRestrictions: {country: 'us'}};
//   //     new google.maps.places.Autocomplete(input, options);
//   //   },
//   //   buttonClick: function() {
//   //     alert(this.refs.searchField.getDOMNode().value);
//   //   },
//   //   render: function() {
//   //     return (
//   //       <div>
//   //         <label htmlFor="searchTextField">
//   //           Please Insert an address:
//   //         </label>
//   //         <br/>
//   //         <input ref='searchField' id="searchTextField" type="text" size="50"/>
//   //         <br/>
//   //         <button onClick={this.buttonClick}>Submit</button>
//   //       </div>
//   //     );
//   //   }
//   // });
//   //
//   // React.renderComponent(<Hello/>, document.body);
//
//   render() {
//     return(
//       <div>
//         <form onSubmit={this._handleBuildingRegister}>
//           <label htmlFor="street_no">
//             Street Number:
//           </label>
//           <input type="text" name="street_no" placeholder="Street Number" onChange={this._handleStreetNo} />
//           <label htmlFor="street_name">
//             Street Name:
//           </label>
//           <input type="text" name="street_name" placeholder="Street Name" onChange={this._handleStreetName} />
//           <label htmlFor="city">
//             City:
//           </label>
//           <input type="text" name="city" placeholder="City" onChange={this._handleCity} />
//           <label htmlFor="province">
//             Province:
//           </label>
//           <input type="text" name="province" placeholder="Province" onChange={this._handleProvince} />
//           <label htmlFor="country">
//             Country:
//           </label>
//           <input type="text" name="country" placeholder="Country" onChange={this._handleCountry} />
//           <label htmlFor="postal_code">
//             Postal Code:
//           </label>
//           <input type="text" name="postal_code" placeholder="Postal Code" onChange={this._handlePostalCode} />
//           <button>Send Building!</button>
//         </form>
//       </div>
//     )
//   }
//   _handleStreetNo(e) {
//     console.log(e.target.value)
//     this.setState({street_no: e.target.value.replace(/\s/g, '').toLowerCase()})
//   }
//   _handleStreetName(e) {
//     console.log(e.target.value)
//     this.setState({street_name: e.target.value.replace(/\s/g, '').toLowerCase()})
//   }
//   _handleCity(e) {
//     console.log(e.target.value)
//     this.setState({city: e.target.value.replace(/\s/g, '').toLowerCase()})
//   }
//   _handleProvince(e) {
//     console.log(e.target.value)
//     this.setState({province: e.target.value.replace(/\s/g, '').toLowerCase()})
//   }
//   _handleCountry(e) {
//     console.log(e.target.value)
//     this.setState({country: e.target.value.replace(/\s/g, '').toLowerCase()})
//   }
//   _handlePostalCode(e) {
//     console.log(e.target.value.replace(/\s/g, '').toLowerCase())
//     this.setState({postal_code: e.target.value.replace(/\s/g, '').toLowerCase()})
//   }
//   _handleBuildingRegister(e) {
//     debugger;
//     const obj = {
//       street_no: this.state.street_no,
//       street_name: this.state.street_name,
//       city: this.state.city,
//       province: this.state.province,
//       postal_code: this.state.postal_code,
//       country: this.state.country
//     }
//     console.log(obj)
//     e.preventDefault()
//     console.log('BUILDING BUILDING BUILDING')
//     console.log(e.target)
//     // const data = new FormData(e.target);
//     // console.log('data: ' + data)
//     fetch('/buildings', {
//       method: 'POST',
//       body: JSON.stringify(obj),
//       headers: {
//       // 'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//     })
//     // .then((response) => response.json())
//     // .then((responseJson) => {
//     //   console.log(responseJson)
//     //   this.props.history.push(responseJson.url)
//     // })
//   }
// }
