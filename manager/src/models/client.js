//用户管理数据
import {
  identity,
  apiAuthority,
  viewAuthority,
  showUser,
  identApiAuthor,
  viewAuthor,
  viewRelate,
  userAdd,
  updataUser,
  userIdent_edit,
  userAuth_apiEdit,
  userAuth_viewEdit,
  userSetIdent,
  userSetView
} from "../services";

export default {
  namespace: "users",

  state: {
    ident: [],
    apiAuth: [],
    viewAuth: [],
    users: [],
    identityApi: [],
    viewAu: [],
    viewRe: [],
    addUser_code: 0,
    updataUser_code: 0,
    userIdent_editCode:0,
    authUser_apiEditCode:0,
    authUser_viewEditCode:0,
    setUserIdentCode:0,
    setUserViewCode:0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    //展示身份数据
    *identity({ payload }, { call, put }) {
      let data = yield call(identity);
      yield put({ type: "userIdent", payload: data.data });
    },
    //展示api接口权限数据
    *apiAuthority({ payload }, { call, put }) {
      let data = yield call(apiAuthority);
      yield put({ type: "apiAuther", payload: data.data });
    },
    //获取视图权限数据
    *viewAuthority({ payload }, { call, put }) {
      let data = yield call(viewAuthority);
      yield put({ type: "viewAuther", payload: data.data });
    },
    //展示用户数据
    *showUser({ payload }, { call, put }) {
      let data = yield call(showUser);
      yield put({ type: "userShow", payload: data.data });
    },
    //展示身份和api权限关系
    *identApiAuthor({ payload }, { call, put }) {
      let data = yield call(identApiAuthor);
      yield put({ type: "identApi", payload: data.data });
    },
    //获取视图权限数据
    *viewAuthor({ payload }, { call, put }) {
      let data = yield call(viewAuthor);
      yield put({ type: "viewAuth", payload: data.data });
    },
    //展示身份和视图权限关系
    *viewRelate({ payload }, { call, put }) {
      let data = yield call(viewRelate);
      yield put({ type: "viewRelation", payload: data.data });
    },
    //添加用户
    *usersAdd({ payload }, { call, put }) {
      let data = yield call(userAdd, payload);
      yield put({ type: "addUser", payload: data.code === 1 ? 1 : -1 });
    },
    //更新用户信息
    *updataUser({ payload }, { call, put }) {
      let data = yield call(updataUser, payload);
      console.log(data);
      yield put({ type: "userUpdata", payload: data.code === 1 ? 1 : -1 });
    },
    //添加身份
    *userIdent_edit({ payload }, { call, put }) {
      let data = yield call(userIdent_edit, payload);
      console.log(data);
      yield put({ type: "identUser_edit", payload: data.code === 1 ? 1 : -1 });
    },
    //添加api接口权限
    *userAuth_apiEdits({ payload }, { call, put }) {
      console.log(payload)
      let data = yield call(userAuth_apiEdit, payload);
      console.log(data);
      yield put({ type: "authUser_apiEdit", payload: data.code === 1 ? 1 : -1 });
    },
    //添加视图权限
    *userAuth_viewEdit({ payload }, { call, put }) {
      let data = yield call(userAuth_viewEdit, payload);
      console.log(data);
      yield put({ type: "authUser_viewEdit", payload: data.code === 1 ? 1 : -1 });
    },
    //给身份设定api接口权限 
    *userSetIdent({ payload }, { call, put }) {
      let data = yield call(userSetIdent, payload);
      yield put({ type: "setUserIdent", payload: data.code === 1 ? 1 : -1 });
    },
    //给身份设定视图权限 
    *userSetView({ payload }, { call, put }) {
      let data = yield call(userSetView, payload);
      yield put({ type: "setUserView", payload: data.code === 1 ? 1 : -1 });
    },
  },

  reducers: {
    userIdent(state, { payload }) {
      return { ...state, ident: payload };
    },
    apiAuther(state, { payload }) {
      return { ...state, apiAuth: payload };
    },
    viewAuther(state, { payload }) {
      return { ...state, viewAuth: payload };
    },
    userShow(state, { payload }) {
      return { ...state, users: payload };
    },
    identApi(state, { payload }) {
      return { ...state, identityApi: payload };
    },
    viewAuth(state, { payload }) {
      return { ...state, viewAu: payload };
    },
    viewRelation(state, { payload }) {
      return { ...state, viewRe: payload };
    },
    addUser(state, { payload }) {
      return { ...state, addUser_code: payload };
    },
    userUpdata(state, { payload }) {
      return { ...state, updataUser_code: payload };
    },
    identUser_edit(state, { payload }) {
      return { ...state, userIdent_editCode: payload };
    },
    authUser_apiEdit(state, { payload }) {
      return { ...state, authUser_apiEditCode: payload };
    },
    authUser_viewEdit(state, { payload }) {
      return { ...state, authUser_viewEditCode: payload };
    },
    setUserIdent(state, { payload }) {
      return { ...state, setUserIdentCode: payload };
    },
    setUserView(state, { payload }) {
      return { ...state, setUserViewCode: payload };
    },
  }
};
