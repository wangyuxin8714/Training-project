import {login} from "../services"


export default {
  // 命名空间
  namespace: "user",

  // 模块内部的状态
  state: {
    // obj:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  // 异步操作
  effects: {
    *login({payload},{call,put,select}){
      const data = yield call(login,payload)

      // const obj = yield select(state=>state.user.obj = data)

    },

    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    }
  },

  // 同步操作
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
