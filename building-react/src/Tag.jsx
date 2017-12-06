import React, { Component } from 'react';

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }
  }
  render() {
    let newArr = []
    this.props.posts.map(function(e){
      e.tags.forEach(function(a) {
        newArr.push(a.name)
      })
    })
    let unique = [...new Set(newArr)];

    let func = this.props.handlePostsByTags
    let selected = this.props.selectedTag
    let btnClass = this.props.btnClass


    return (
      <div className="tag-list">
        <ul>
          {unique.map(function(e){
            if(selected == e) {
              return <button onClick={func} className={btnClass} value={e}>{e}</button>
            } else {
              return <button onClick={func} value={e}>{e}</button>
            }
          })}
        </ul>
      </div>
    )
  }
}
