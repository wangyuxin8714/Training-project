//登录接口数据
import {login,getUserInfo, getViewAuthority,imgadd} from "../services"
import {routerRedux} from 'dva/router'
import {getToken,setToken,delToken} from "../utils/user"

import allView from '../route/config.js'

export default {

    namespace: 'user',
    
    state: {
        islogin:0,
        userInfo: {},
        viewAuthority: [],  // 用户所拥有的视图权限
        myView: [],  // 拥有权限的前端路由
        forbiddenView: [], //没有权限访问的路由
    },

    // 订阅路由跳转
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
      //   console.log('pathname...',pathname)
      // console.log('Token...',getToken())

        // console.log('pathname...', pathname);
        // 1.判断去的页面是否是登陆页面
        if (pathname.indexOf('/login') === -1) {
          // 不是登录页
          // 1.1 判断是否有登陆态
          if (!getToken()){
            // 1.1.1没有登陆态，利用redux做路由跳转
            dispatch(routerRedux.replace({
              pathname: `/login`,
              search: `?redirect=${encodeURIComponent(pathname)}`
            }))
          }else{
            // 1.1.2 有登录态，请求用户信息,请求用户权限
            dispatch({
              type: 'getUserInfo'
            })
          }
        // 1.2用户没有登录态
        }else{
          // 1.2.1去登陆页面，如果已登陆跳回首页
          if (getToken()){
             // 利用redux做路由跳转
             dispatch(routerRedux.replace({
              pathname: `/`,
            }))
          }
        }
      });
    },
  },

    effects: {
        *login({payload}, {select,call, put}) {
            let data = yield call(login,payload)
            if(data.code===1){
                setToken(data.token)
            }
            yield put({type:"updatalogin",payload:data.code===1?1:-1})
            yield put({type:"updatalogin",payload:0})

        },
        *fetch({payload}, {call,put}) { // eslint-disable-line
            yield put({ type: 'save' });
        },
        *imgadd({payload}, {call,put}) { // eslint-disable-line
          let userInfo = yield call(getUserInfo);
          let params={...payload}
          params.user_id=userInfo.data.user_id
          yield call(imgadd,params);
        },
        *getUserInfo({payload}, {call, put, select}){
          // 1.判断是否有权限信息
          let myView = yield select(state=>state.user.myView);
          if (myView.length){
            return;
          }
   
          // 2.获取用户信息
          let userInfo = yield call(getUserInfo);
         //  console.log('userInfo...', userInfo);
          yield put({
            type: 'updateUserInfo',
            payload: userInfo.data
          })
   
          // 3.根据id获取视图权限
          let viewAuthority = yield call(getViewAuthority, userInfo.data.user_id);
          yield put({
            type: 'updateViewAuthority',
            payload: viewAuthority.data
          })
       },
       *outlogin({ payload }, { call, put }) {
        yield put({ type: "loginout" });
      }
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
        updatalogin(state,{payload}){
            return {...state,islogin:payload}
        },
        updateUserInfo(state, {payload}){
          return {...state, userInfo: payload}
        },
        updateViewAuthority(state, {payload}){
          // 筛选出我所有的前端路由权限
          let myView = allView.routes,
              forbiddenView = [];
          myView.forEach(item=>{
            item.children = item.children.filter(value=>{
              if (payload.findIndex(id=>id.view_id===value.id) !== -1){
                return true;
              }else{
                forbiddenView.push(value.path);
                return false;
              }
            })
          })
          return {...state, viewAuthority: payload, myView, forbiddenView}
        },
        loginout(state){
          delToken()
          return {...state,userInfo: {},viewAuthority: [],myView: [],forbiddenView: []}
        }
    },

};