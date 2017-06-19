import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../redux/user';

// Component //

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-inverse" role="navigation">
          <div className="container">
              <div className="navbar-header">
                  <Link className="navbar-brand" to="home">Bark</Link>
                  <ul className="nav navbar-nav">
                      <li>
                        {
                          props.type === 'BASIC' ?
                          <Link to="interests">Interest History</Link> :
                          <Link to="home">Add Pet</Link>
                        }
                      </li>
                      <li>
                        {
                          props.loggedIn ?
                            <a onClick={props.handleClick} >logout</a> :
                            <Link to="login">login</Link>
                        }
                      </li>
                      {
                        !props.loggedIn && (
                          <li>
                              <Link to="signup">signup</Link>
                          </li>
                        )
                      }
                  </ul>
              </div>
          </div>
        </nav>
    </div>
  )
}

const mapState = ({ user }) => ({
  loggedIn: !!user.id,
  type: user.type
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout())
      .then(() => browserHistory.push('/'));
  }
});

export default connect(mapState, mapDispatch)(Navbar);
