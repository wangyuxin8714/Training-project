import {getClass,getRoom,addClass,changeGrade,delClass} from "../services"
export default {

    namespace: 'grade',
  
    state: {
        getClassData:[],
        getRoomData:[],
        addclasscode:0,
        gradeChangeCode:0
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
        *getClass({ payload }, { call, put }) {  // eslint-disable-line
            let data=yield call(getClass)
            yield put({ type: 'updateclass',payload:data.data });
        },
        *getRoom({ payload }, { call, put }) {  // eslint-disable-line
            let data=yield call(getRoom)
            yield put({ type: 'updateroom',payload:data.data });
        },
        *addClass({ payload }, { call, put }) {  // eslint-disable-line
            let data=yield call(addClass,payload)
            yield put({ type: 'updateaddclasscode',payload:data.code===1?1:-1});
        },
        *changeGrade({ payload }, { call, put }) {  // eslint-disable-line
            let data=yield call(changeGrade,payload)
            yield put({ type: 'gradeChange',payload:data.code===1?1:-1});
        },
        *delClass({ payload }, { call, put }) {  // eslint-disable-line
            let data=yield call(delClass,payload)
            console.log(data)
            // yield put({ type: 'gradeChange',payload:data.code===1?1:-1});
        },
    },
  
    reducers: {
        updateclass(state, {payload}) {
            return { ...state, getClassData:payload};
        },
        updateroom(state, {payload}) {
            return { ...state, getRoomData:payload};
        },
        updateaddclasscode(state, {payload}) {
            return { ...state, addclasscode:payload};
        },
        gradeChange(state, {payload}) {
            return { ...state, gradeChangeCode:payload};
        },
    },
  
  };
  