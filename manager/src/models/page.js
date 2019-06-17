import {margerGrade,getnopaper,godetail} from "../services/page"

export default {

    namespace: 'page',
  
    state: {
        merger:[],
        nopaperlist:[]
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
          console.log(data)
          // yield put({ type: 'nopapardata',payload:data.exam });
        }
    },
  
    reducers: {
      gardMerger(state, {payload}) {
        return { ...state,merger:payload};
      },
      nopapardata(state, {payload}) {
        return { ...state,nopaperlist:payload};
      },
    },
  
  };
  