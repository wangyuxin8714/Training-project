//试题管理数据

import {getlistdet,updateexam,updatequestion,examType,coursetype,topictype,allNew,getuser,addquestion,addexam,testlist,lookquestion,insertExam,delQuestionType} from "../services"
export default {
  namespace: "question",
  
    state: {
        examtypelist:[],
        coursetypelist:[],
        topictypelist:[],
        allQuestion:[],
        id:null,
        addquescode:0,
        addexamlist:null,
        gettestlist:[],
        items:{},
        upcode:0,
        insert:1,
        del:1,
        getlistdets:null,
        useName:""
        // randomlist:[]
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
          payload: data.data
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
          if(data.code===1){
            yield put({type:"updateexamcode",payload:data.data})
            window.localStorage.setItem("detail",JSON.stringify(data.data))
          }
        },
        //删除试卷内试题
        *dellist({ payload }, { call, put }) {  // eslint-disable-line
            let obj=JSON.parse(window.localStorage.getItem("detail"))
            obj.questions.splice(payload,1)
            yield put({type:"updateexamcode",payload:obj})
            window.localStorage.setItem("detail",JSON.stringify(obj))
        },
        //添加试卷内试题
        *addques({ payload }, { call, put }) {  // eslint-disable-line
          let obj=JSON.parse(window.localStorage.getItem("detail"))
          obj.questions.push(payload)
          yield put({type:"updateexamcode",payload:obj})
          window.localStorage.setItem("detail",JSON.stringify(obj))
        },
        //更新试卷
        *updateexam({ payload }, { call, put }) {  // eslint-disable-line
            yield call(updateexam,payload);
        },
        // 获取所有的试卷
        *testlist({ payload }, { call, put }) {  // eslint-disable-line
          let data = yield call(testlist,payload);
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
        *insertExams({payload}, { call, put }) {
          let data = yield call(insertExam, payload);
          yield put({type:"insertCode",payload:data.code})
        },
        //删除指定的试题类型
        *delQuesType({payload}, { call, put }) {
          let data = yield call(delQuestionType, payload);
          yield put({type:"delType",payload:data.code === 1 ? 1 : -1})
        },
        //过滤试卷
        *filtertab({payload}, { call, put }) {
          let data = yield call(testlist);
          let datafilter = data.exam.filter(item=>item.status===payload)
          yield put({type:"updatetestlist",payload:datafilter})
        },
        //获取指定试卷详情
        *getlistdet({payload}, { call, put }) {
          let data = yield call(getlistdet,payload);
          yield put({type:"getlistdeta",payload:data.data})
          window.localStorage.setItem("listdet",JSON.stringify(data.data))
        },
        // //随机试题
        // *randomQuestion({payload}, { call, put }) {
        //   let data = yield call(allNew);
        //   let arr=[]
        //   while(arr.length<payload){
        //       let index=Math.floor(Math.random()*(data.data.length-payload))
        //       arr.push(data.data[index])
        //       data.data.splice(index,1)
        //   }
        //   yield put({type:"random",payload:arr})

        // }
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
        return { ...state, id:payload.user_id,useName:payload.user_name };
      },
      // 添加试题
      updatecode(state, {payload}) {
        return { ...state, addquescode:payload };
      },
      //添加考试
      updateexamcode(state, {payload}) {
        return { ...state, addexamlist:payload };
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
      //添加试题类型
      insertCode(state, {payload}) {
        return { ...state, insert:payload };
      },
      //删除指定的试题类型
      delType(state, {payload}) {
        return { ...state, del:payload };
      },
      //跳详情
      updateitems(state, {payload}) {
        return { ...state, items:payload };
      },
      getlistdeta(state, {payload}) {
        return { ...state, getlistdets:payload };
      },
      // //随机试题
      // random(state, {payload}) {
      //   return { ...state, randomlist:payload };
      // },
    },
  }
