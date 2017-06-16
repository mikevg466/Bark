import React from 'react';

// Component //

const Main = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-11 col-xs-10"></div>
        <div className="col-md-1 col-xs-2">
          <div className="glyphicon glyphicon-user" aria-hidden="true"></div>
          <span>{props.user && props.user.name ? props.user.name : null}</span>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Main;
