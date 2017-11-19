import React, { Component } from 'react';

export default class CreateTag extends Component {
  constructor() {
    super();
    this.state = {
      arr: []
    }
    this.setState = this.setState.bind(this)
    this._handleTag = this._handleTag.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }
  render() {
    return (
      <div>
        <form onSubmit={this._handleTag}>
          <label htmlFor="tag">
            New Tag:
          </label>
          <input type="text" name="tag" placeholder="Create your tag" onChange={this._handleChange} />
          <button>Create tag!</button>
        </form>
      </div>
    )
  }
  _handleTag(e) {
    e.preventDefault();
    // const content = new FormData(e.target);
    console.log(e.target)
    const content = new FormData(e.target);
    fetch('/buildings/1/tags', {
      method: 'POST',
      body: content
    });
  }
  _handleChange(e) {
    console.log('in hangle change' + e.target.value)
  }
}
