import {margerGrade,getnopaper,godetail,submitpaper} from "../services"

export default {

    namespace: 'page',
  
    state: {
        merger:[],
        nopaperlist:[],
        paperdetail:null,
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
        *margerGrade({ payload }, { call, put }) {  // eslint-disable-line
            let data = yield call(margerGrade)
            yield put({ type: 'gardMerger',payload:data.data });
          },
        *getnopaper({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(getnopaper,payload)
          yield put({ type: 'nopapardata',payload:data.exam });
        },
        *godetail({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(godetail,payload)
          yield put({ type: 'updatedetail',payload:data.data });
        },
        *submitpaper({ payload }, { call }) {  // eslint-disable-line
          yield call(submitpaper,payload)
          
        }
    },
  
    reducers: {
      gardMerger(state, {payload}) {
        return { ...state,merger:payload};
      },
      nopapardata(state, {payload}) {
        return { ...state,nopaperlist:payload};
      },
      updatedetail(state, {payload}) {
        return { ...state,paperdetail:payload};
      },
    },
  
  };
  