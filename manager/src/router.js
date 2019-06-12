import React from 'react';
<<<<<<< HEAD
import { Router, Route, Switch  } from 'dva/router';
import MainPage from "./views/MainPage/";
// import Login from "./views/login"
=======
import { Router,Redirect, Route, Switch  } from 'dva/router';
import MainPage from "./views/MainPage/";
import Login from "./views/login"
>>>>>>> wyx



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
<<<<<<< HEAD
        <Route path="/main" component={MainPage} />

        <Route path="/" exact component={Login} />

=======
        <Route path="/Login"  component={Login} />
        <Route path="/" component={MainPage} />
>>>>>>> wyx
      </Switch>
    </Router>
  );
}

export default RouterConfig;
