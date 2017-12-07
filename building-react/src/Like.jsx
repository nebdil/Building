import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap'
import classNames from 'classnames'
import LikeLength from './LikeLength.jsx';

function Like(props) {
  //if no likes && if current_user didnt like it
  let btnClass = classNames({
    'fa fa-heart-o': true
  });
  //if likes exist && liked by current_user
  props.likes.map((l) => {
    if (l.user_id == localStorage.getItem('user_id')) {
      btnClass = classNames({
        'fa fa-heart': true
      })
    }
  })
  return(
    <ButtonToolbar>
      <Button id="peace-div" bsSize="xsmall" type="submit">
        <i className={btnClass} aria-hidden="true"></i>
      </Button>
      <LikeLength likeLength={props.likeLength}/>
    </ButtonToolbar>
  )
}

export default Like;
