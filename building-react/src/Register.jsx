// import React, { Component } from 'react';
//
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch
// } from 'react-router-dom'
//
// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       email: '',
//       password: '',
//       password_confirmation: ''
//     }
//     // this._handleChange = this._handleChange.bind(this)
//     this._handleRegister = this._handleRegister.bind(this)
//     this.setState = this.setState.bind(this)
//     this._handleEmail = this._handleEmail.bind(this)
//     this._handleUsername = this._handleUsername.bind(this)
//     this._handlePassword = this._handlePassword.bind(this)
//     this._handlePasswordConfirmation = this._handlePasswordConfirmation.bind(this)
//   }
//   render() {
//     return(
//       <div>
//         <h1>BUILDING(COMMUNITIES)</h1>
//         <p>REGISTER</p>
//         <form onSubmit={this._handleRegister}>
//           <label htmlFor="email">
//             Email:
//           </label>
//           <input type="text" name="email" placeholder="Your email" onChange={this._handleEmail} />
//
//           <label htmlFor="username">
//             Username:
//           </label>
//           <input type="text" name="username" placeholder="Your username" onChange={this._handleUsername} />
//
//           <label htmlFor="password">
//             Password:
//           </label>
//           <input type="text" name="password" placeholder="Your password" onChange={this._handlePassword} />
//
//           <label htmlFor="password_confirmation">
//             Password Confirmation:
//           </label>
//           <input type="text" name="password_confirmation" placeholder="Your password again" onChange={this._handlePasswordConfirmation} />
//
//           <button>Register!</button>
//         </form>
//         {/* {if (flash[:notice]) {
//           <div>{flash[:notice]}</div>
//         }} */}
//       </div>
//     )
//   }
//   _handleRegister(e) {
//     const obj = {
//       email: this.state.email,
//       username: this.state.username,
//       password: this.state.password,
//       password_confirmation: this.state.password_confirmation
//     }
//     console.log(obj)
//     e.preventDefault()
//     console.log('REGISTER REGISTER REGISTER')
//     console.log(e.target)
//     const data = new FormData(e.target);
//     console.log('data: ' + data)
//     fetch('/register', {
//       method: 'POST',
//       body: data
//     //   headers: {
//     //   'Accept': 'application/json',
//     //   'Content-Type': 'application/json'
//     // },
//     })
//     .then((response) => response.json())
//     .then((responseJson) => {
//       console.log(responseJson)
//     })
//   }
//   // _handleChange(e) {
//   //   console.log('in hangle change' + e.target.value)
//   //   // console.log('in hangle change')
//   //   // console.log(this.props)
//   // }
//   _handleEmail(e) {
//     console.log(e.target.value)
//     this.setState({email: e.target.value})
//   }
//   _handleUsername(e) {
//     console.log(e.target.value)
//     this.setState({username: e.target.value})
//   }
//   _handlePassword(e) {
//     console.log(e.target.value)
//     this.setState({password: e.target.value})
//   }
//   _handlePasswordConfirmation(e) {
//     console.log(e.target.value)
//     this.setState({password_confirmation: e.target.value})
//   }
// }
