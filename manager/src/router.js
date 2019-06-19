import React from "react";
import { Router, Switch } from "dva/router";
import {connect} from 'dva';
import {MapRoute,route} from "./route"



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
      <MapRoute route={route}></MapRoute>
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
