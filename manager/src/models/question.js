import {examType,coursetype,topictype} from "../services"
export default {

    namespace: 'question',
  
    state: {
        examtypelist:[],
        coursetypelist:[],
        topictypelist:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
        *examType({ payload }, { call, put }) {  // eslint-disable-line
        let data = yield call(examType);
        yield put({
            type: 'updateexamtype',
            payload: data.data
        })
        },
        *coursetype({ payload }, { call, put }) {  // eslint-disable-line
            let data = yield call(coursetype);
            yield put({
            type: 'updatecoursetype',
            payload: data.data
        })
        },
        *topictype({ payload }, { call, put }) {  // eslint-disable-line
            let data = yield call(topictype);
            console.log(data)
            yield put({
            type: 'updatetopictype',
            payload: data.data
        })
        }
    },
  
    reducers: {
      
      updateexamtype(state, {payload}) {
        
        return { ...state, examtypelist:payload };
      },
      updatecoursetype(state, {payload}) {
        
        return { ...state, coursetypelist:payload };
      },
      updatetopictype(state, {payload}) {
        
        return { ...state, topictypelist:payload };
      },
    },
  
  };
  