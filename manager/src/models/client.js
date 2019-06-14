//用户管理数据
import {identity,apiAuthority,viewAuthority,showUser,identApiAuthor,viewAuthor,viewRelate} from "../services"


export default {

    namespace: 'users',
  
    state: {
      ident:[],
      apiAuth:[],
      viewAuth:[],
      users:[],
      identityApi:[],
      viewAu:[],
      viewRe:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      //展示身份数据
      *identity({payload},{call,put}){
        let data = yield call(identity)
        yield put({type:"userIdent",payload:data.data})
      },
      //展示api接口权限数据
      *apiAuthority({payload},{call,put}){
        let data = yield call(apiAuthority);
        yield put({type:"apiAuther",payload:data.data})
      },
      //获取视图权限数据
      *viewAuthority({payload},{call,put}){
        let data = yield call(viewAuthority)
        yield put({type:"viewAuther",payload:data.data})
      },
      //展示用户数据
      *showUser({payload},{call,put}){
        let data = yield call(showUser);
        yield put({type:"userShow",payload:data.data})
      },
      //展示身份和api权限关系
      *identApiAuthor({payload},{call,put}){
        let data = yield call(identApiAuthor);
        yield put({type:"identApi",payload:data.data})
      },
      //获取视图权限数据
      *viewAuthor({payload},{call,put}){
        let data = yield call(viewAuthor);
        yield put({type:"viewAuth",payload:data.data})
      },
      //展示身份和视图权限关系
      *viewRelate({payload},{call,put}){
        let data = yield call(viewRelate);
        yield put({type:"viewRelation",payload:data.data})
      },
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
      userIdent(state,{payload}){
        return {...state, ident:payload}
      },
      apiAuther(state,{payload}){
        return {...state, apiAuth:payload}
      },
      viewAuther(state,{payload}){
        return {...state, viewAuth:payload}
      },
      userShow(state,{payload}){
        return {...state,users:payload}
      },
      identApi(state,{payload}){
        return {...state,identityApi:payload}
      },
      viewAuth(state,{payload}){
        return {...state,viewAu:payload}
      },
      viewRelation(state,{payload}){
        return {...state,viewRe:payload}
      },
    },
  };
  