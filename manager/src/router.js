import React from "react";
import { Router, Route, Switch } from "dva/router";
import MainPage from "./views/MainPage/";
import Login from "./views/login";
import {connect} from 'dva';

// 引入国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from './lang/zh-CN.js';
import enUS from './lang/en-US.js';
const localMap = {
  en: enUS,
  zh: zhCN
}

addLocaleData([...en, ...zh]);

const mapStateToProps = state=>{
  return {
    locale: state.global.locale
  }
}

const RouterView = connect(mapStateToProps)(({locale,history})=>{
  return <IntlProvider locale={locale} messages={localMap[locale]}>
     <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/" component={MainPage} />
      </Switch>
  </IntlProvider>
})

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <RouterView/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
