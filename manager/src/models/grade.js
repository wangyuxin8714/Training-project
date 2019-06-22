import {getClass,getRoom,addClass,changeGrade,delClass,getStudent,delStudent,addRoom,delRoom} from "../services"
export default {

    namespace: 'grade',
  
    state: {
        getClassData:[],
        getRoomData:[],
        addclasscode:0,
        gradeChangeCode:0,
        studentArr:[],
        delCode:0,
        roomAddCode:0,
        roomDelCode:0
    },
  
    subscriptions: {
      setup({ dispatch, history }) { 
      },
    },
  
    effects: {
        *getClass({ payload }, { call, put }) {  
            let data=yield call(getClass)
            yield put({ type: 'updateclass',payload:data.data });
        },
        *getRoom({ payload }, { call, put }) { 
            let data=yield call(getRoom)
            yield put({ type: 'updateroom',payload:data.data });
        },
        *addClass({ payload }, { call, put }) { 
            let data=yield call(addClass,payload)
            yield put({ type: 'updateaddclasscode',payload:data.code===1?1:-1});
        },
        *changeGrade({ payload }, { call, put }) {  
            let data=yield call(changeGrade,payload)
            yield put({ type: 'gradeChange',payload:data.code===1?1:-1});
        },
        *delClass({ payload }, { call, put }) {  
            let data=yield call(delClass,payload)
            console.log(data)
            // yield put({ type: 'gradeChange',payload:data.code===1?1:-1});
        },
        *getStudents({ payload }, { call, put }) {  
            let data=yield call(getStudent);
            yield put({ type: 'studentGet',payload:data.data});
        },
        *searchClick({payload} , { select, put }) {
            let obj = JSON.parse(JSON.stringify(payload));
            //过滤数据
            const data = yield select(state => {
                for(let k in obj){
                    if(!obj[k]){
                        delete obj[k]
                    }
                }
                return state.grade.studentArr.filter(item=>{
                    return Object.keys(obj).every(val=>item[val] === obj[val])
                });
            })
            yield put({ type: 'search',payload:data});
        },
        *delStudent({payload} , { call, put }) {
            let data=yield call(delStudent,payload);
            yield put({ type: 'del',payload:data.code===1?1:-1});            
        },
        *addRoom({ payload }, { call, put }) { 
            let data=yield call(addRoom,payload)
            yield put({ type: 'roomAdd',payload:data.code===1?1:-1});
            if(data.code){
                yield put({type:"getRoom"})
            }
        },
        *delRoom({ payload }, { call, put }) { 
            let data=yield call(delRoom,payload)
            yield put({ type:"roomDel",payload:data.code===1?1:-1});
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
        studentGet(state, {payload}) {
            return { ...state, studentArr:payload};
        },
        search(state, {payload}) {
            return {...state,studentArr:payload};
        },
        del(state, {payload}) {
            return {...state,delCode:payload};
        },
        roomAdd(state, {payload}) {
            return {...state,roomAddCode:payload};
        },
        roomDel(state, {payload}) {
            return {...state,roomDelCode:payload};
        },
    },
  
  };
  