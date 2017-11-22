import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Dialog from './Dialog'

// Client-side model
// import Resource from '../models/resource'
// const ProductStore = Resource('products')


export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postId: (this.props.match.params.id || null),
      post: {},
      show: false,
      redirect: ''
    }
  }

  componentDidMount() {
    return(fetch(`http://localhost:3000/buildings/1/posts/${this.state.postId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({post: responseJson})
    })
    // .then(alert('this.state.post: ' + this.state.post))
    // .then(alert('this.state.postId: ' + this.state.postId))
    )
  }

  _hide = () => {
    this.setState({show: false, redirect: '/buildings/1/posts'})
  }

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />

    return (
      <div>
        {
          this.state.postId &&
          <Dialog
            show={this.state.show}
            onHide={this._hide}
            title={this.state.post.user_id}>
            <p>
             <strong>{this.state.post.content}</strong>.
            </p>
            {/* <p>
              It costs <strong>${this.state.post.price}</strong> and there are <strong>{this.state.post.quantity}</strong> units in stock.
            </p> */}
          </Dialog>
        }
      </div>
    )
  }
}


// import React, { Component } from 'react';
// import Reply from './Reply.jsx';
// import Like from './Like.jsx';
// import Tag from './Tag.jsx';
// import SendReply from './SendReply.jsx'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch
// } from 'react-router-dom'
//
// export default class Post extends Component {
//   constructor() {
//     super();
//     this.state = {
//       showReply: false
//     }
//   }
//   onClick(e){
//     e.preventDefault();
//     this.setState({showReply: !this.state.showReply})
//   }
//   render() {
//
//     const handleReplyChange = this.props.handleReplyChange;
//     const handleReplySubmit = this.props.handleReplySubmit;
//     const post = this.props.currentPosts.content;
//     const postId = this.props.currentPosts.id;
//     const user = this.props.currentPosts.username;
//     const time = this.props.currentPosts.created_at;
//     const replySize = this.props.currentPosts.reply.length;
//     const likeSize = this.props.currentPosts.like.length;
//     const divStyle = {
//       border: "1px solid black"
//     }
//     return (
//       <div>
//       {/* <div onClick={this.onClick.bind(this)}> */}
//         <table style={divStyle}>
//           <tbody>
//             <tr>
//               <th>POST</th>
//               <th>USER</th>
//               <th>TIME</th>
//               <th onClick={this.onClick.bind(this)}>REPLY SIZE</th>
//               <th>REPLY BUTTON</th>
//               <th>LIKE SIZE</th>
//               <th>LIKE BUTTON</th>
//               <th>TAG</th>
//             </tr>
//             <tr>
//               <td>{post}</td>
//               <td>{user}</td>
//               <td>{time}</td>
//               <td>{replySize}</td>
//               <td><SendReply postId = {postId} handleReplyChange = {handleReplyChange} handleReplySubmit = {handleReplySubmit} postId={postId} /></td>
//               <td>{likeSize}</td>
//               <td><Like postId={postId}/></td>
//               {this.props.currentPosts.tags.map(function(e) {
//                 return <td>{e.name}</td>
//               })}
//             </tr>
//           </tbody>
//         </table>
//         {this.state.showReply && this.props.currentPosts.reply.map(function(e) {
//           return <Reply currentReplies = {e} key = {e.id}/>
//         })}
//       </div>
//     )
//   }
// }
