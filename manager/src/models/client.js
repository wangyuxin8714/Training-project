//用户管理数据
import {identity,apiAuthority,viewAuthority} from "../services"


export default {

    namespace: 'users',
  
    state: {
      ident:[],
      apiAuth:[],
      viewAuth:[]
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
        console.log("apidata...",data)
        yield put({type:"apiAuther",payload:data.data})
      },
      //获取视图权限数据
      *viewAuthority({payload},{call,put}){
        let data = yield call(viewAuthority)
        console.log("viewdata...",data)
        yield put({type:"viewAuther",payload:data.data})
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
      }
    },
  
  };
  