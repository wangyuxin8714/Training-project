import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import MainPage from "./views/MainPage/MainPage";

import Home from './views/home/home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
