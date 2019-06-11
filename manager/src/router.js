import React from 'react';
import { Router, Route, Switch  } from 'dva/router';
import MainPage from "./views/MainPage/";
import Login from "./views/login"

<<<<<<< HEAD
import Login from './views/login/Login';
=======
>>>>>>> srr

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/main" component={MainPage} />
<<<<<<< HEAD
        <Route path="/" exact component={Login} />
=======
        <Route path="/" component={Login} />
>>>>>>> srr
      </Switch>
    </Router>
  );
}

export default RouterConfig;
