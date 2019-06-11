import React from 'react';
import { Router, Route, Switch  } from 'dva/router';
import MainPage from "./views/MainPage/";
import Login from "./views/login"


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
