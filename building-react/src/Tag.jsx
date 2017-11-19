import React, { Component } from 'react';

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    }
    this.setState = this.setState.bind(this)
  }
  render() {
    let newArr = this.state.arr
    this.props.posts.map(function(e){
      // console.log(e.tags)
      e.tags.map(function(a) {
        newArr.push(a.name)
        // console.log("a.name " + a.name)
      })
    })
    // console.log("newArr " + newArr)
    let unique = [...new Set(newArr)];

    let func = this.props.handlePostsByTags

    return (
      <div>
        <ul>
          {unique.map(function(e){
            return <button onClick={func} value={e}>{e}</button>
          })}
        </ul>
      </div>
    )
  }
}
