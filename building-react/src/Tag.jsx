import React, { Component } from 'react';

function Tag(props) {
  let newArr = [];
  props.posts.forEach((e) => {
    e.tags.forEach((a) => {
      newArr.push(a.name)
    })
  })
  let unique = [...new Set(newArr)];
  return (
    <div className="tag-list">
      <ul>
        {unique.map(function(e){
          console.log('props.selectedTag[0]')
          console.log(props.selectedTag[0])
          console.log('e')
          console.log(e)
          if(props.selectedTag[0] === e) {
            console.log('in if')
            return <button onClick={props.handlePostsByTags} className={props.btnClass} value={e}>{e}</button>
          } else {
            console.log('in else')
            return <button onClick={props.handlePostsByTags} value={e}>{e}</button>
          }
        })}
      </ul>
    </div>
  )
}
export default Tag;
