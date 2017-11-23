import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Dialog from './Dialog'
import SendReply from './SendReply.jsx'
import Like from './Like.jsx'

// Client-side model
// import Resource from '../models/resource'
// const ProductStore = Resource('products')


export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postId: (this.props.match.params.id || null),
      post: {},
      show: true,
      redirect: ''
    }
    this._handleReplySubmit = this._handleReplySubmit.bind(this)
    this._handleReplyChange = this._handleReplyChange.bind(this)
  }

  componentDidMount() {
    return(fetch(`http://localhost:3000/buildings/1/posts/${this.state.postId}`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('user_token')}`
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return this.setState({post: responseJson})
    })
    .then(() => {
      this.state.post.tags.map((e) => {
        let arr = []
        arr.push(e.name)
        this.setState({tags: arr})
      })
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
          this.state.postId && this.state.post.reply &&
          <Dialog
            show={this.state.show}
            onHide={this._hide}
            title={this.state.post.username}
            footer={this.state.tags}>
            <p>content:</p>
            <p>
             <strong>{this.state.post.content}</strong>.
            </p>
            <p>{this.state.post.created_at}</p>
            {this.state.post.reply.map((e) => {
              return <p>{e.content}</p>
            })}
            <SendReply postId = {this.state.postId} handleReplyChange = {this._handleReplyChange} handleReplySubmit = {this._handleReplySubmit} postId={this.state.postId} />
            <p>Like count:</p>
            <p>{this.state.post.like.length}</p>
            <Like postId={this.state.postId}/>

          </Dialog>
        }
      </div>
    )
  }
  _handleReplyChange(e) {
    console.log('in handleReplyChange:', e.target.value);
  }
  _handleReplySubmit(e) {
    e.preventDefault();
    console.log(e.currentTarget)
    const content = new FormData(e.currentTarget);
    const repliesPostId = e.currentTarget.getAttribute('data-post-id')
    console.log(repliesPostId);
    // this.state.posts.forEach((post) => {
      if (this.state.postId == repliesPostId) {
        console.log('we got a match, post:', this.state.postId);
        fetch(`http://localhost:3000/buildings/1/posts/${this.state.postId}/replies`, {
          method: 'POST',
          body: content,
          headers: {
            'Authorization': `bearer ${localStorage.getItem('user_token')}`
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          const replies = this.state.post.reply.push(responseJson)
          this.setState({post: this.state.post})
        })
      }
    // })
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
