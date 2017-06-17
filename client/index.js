import '../bin/assets/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome, LoginHome } from './components';
import { me } from './redux/user';
import { fetchPets, selectRandomPet } from './redux/pet';

const whoAmI = store.dispatch(me());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/loginHome');
      next();
    })
    .catch(err => console.log(err));

const onEnterUserHome = () =>
  store.dispatch(fetchPets())
    .then(() => store.dispatch(selectRandomPet()))
    .catch(console.error.bind(console));



ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Main }>
        <IndexRoute component={ Main } />
          <Route onEnter={ requireLogin }>
            <Route path="home" component={ UserHome } onEnter={ onEnterUserHome } />
          </Route>
          <Route path="loginHome" component={ LoginHome } />
          <Route path="login" component={ Login } />
          <Route path="signup" component={ Signup } />
        <IndexRedirect to="home" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
