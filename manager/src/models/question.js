//试题管理数据

import {updatequestion,examType,coursetype,topictype,allNew,getuser,addquestion,addexam,testlist,lookquestion,insertExam} from "../services"
export default {
  namespace: "question",
  
    state: {
        examtypelist:[],
        coursetypelist:[],
        topictypelist:[],
        allQuestion:[],
        id:null,
        addquescode:0,
        addexamcode:0,
        gettestlist:[],
        upcode:0,
        items:{}
    },
    
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
        //获取所有的考试类型
        *examType({ payload }, { call, put }) {  // eslint-disable-line
        let data = yield call(examType);
        yield put({
            type: 'updateexamtype',
            payload: data.data
        })
        },
        // 获取所有的课程类型
        *coursetype({ payload }, { call, put }) {  // eslint-disable-line
            let data = yield call(coursetype);
            yield put({
            type: 'updatecoursetype',
            payload: data.data
        })
        },
        // 获取所有的题目类型
        *topictype({ payload }, { call, put }) {  // eslint-disable-line
            let data = yield call(topictype);
            yield put({
            type: 'updatetopictype',
            payload: data.data
        })
        },
        // 获取所有的试题
        *allNew({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(allNew);
          yield put({
          type: 'upadataAll',
          payload: data.data
        })
        },
        // 获取当前的用户
        *getuser({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(getuser);
          yield put({
          type: 'upadataid',
          payload: data.data.user_id
        })
        },
        // 添加试题
        *addquestion({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(addquestion,payload);
          yield put({type:"updatecode",payload:data.code===1?1:-1})
        },
        //添加考试
        *addexam({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(addexam,payload);
          yield put({type:"updateexamcode",payload:data.code===1?1:-1})
        },
        // 获取所有的试卷
        *testlist({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(testlist);
          console.log(data)
          yield put({type:"updatetestlist",payload:data.exam})
        },
        // 查询试题
        *lookquestion({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(lookquestion,payload);
          yield put({type:"updatelookquestion",payload:data.data})
        },
        //跳详情
        *godetail({ payload }, { call,put }) {  // eslint-disable-line
          let data = yield call(lookquestion,payload);
          window.localStorage.setItem("getquestions",JSON.stringify(data.data[0]))
          yield put({type:"updateitems",payload:data.data[0]})

        },
        //更新试题
        *updatequestion({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(updatequestion,payload);
          yield put({type:"updateupcode",payload:data.code===1?1:-1})
        },
        //添加试题类型
        *insertExam({payload}, { call, put }) {
          let data = yield call(insertExam, payload);
          console.log("data",data)
        }
    },
  
    reducers: {
      //获取所有的考试类型
      updateexamtype(state, {payload}) {
        return { ...state, examtypelist:payload };
      },
      // 获取所有的课程类型
      updatecoursetype(state, {payload}) {
        return { ...state, coursetypelist:payload };
      },
      // 获取所有的题目类型
      updatetopictype(state, {payload}) {
        return { ...state, topictypelist:payload };
      },
      // 获取所有的试题
      upadataAll(state, {payload}) {
        return { ...state, allQuestion:payload };
      },
      // 获取当前的用户
      upadataid(state, {payload}) {
        return { ...state, id:payload };
      },
      // 添加试题
      updatecode(state, {payload}) {
        return { ...state, addquescode:payload };
      },
      //添加考试
      updateexamcode(state, {payload}) {
        return { ...state, addexamcode:payload };
      },
      // 获取所有的试题
      updatetestlist(state, {payload}) {
        return { ...state, gettestlist:payload };
      },
      // 查询试题
      updatelookquestion(state, {payload}) {
        return { ...state, allQuestion:payload };
      },
      //更新试题
      updateupcode(state, {payload}) {
        return { ...state, upcode:payload };
      },
      //跳详情
      updateitems(state, {payload}) {
        return { ...state, items:payload };
      },
    },
  }
