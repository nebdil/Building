import React, { Component } from 'react';

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
      let func = this.props.handlePostsByTags
      let unique = this.props.unique_tags

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
