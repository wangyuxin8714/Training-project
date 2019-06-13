//试题管理数据
import {
  examType,
  coursetype,
  topictype,
  allNew,
  insertExam
} from "../services";


export default {
  namespace: "question",

  state: {
    examtypelist: [],
    coursetypelist: [],
    topictypelist: [],
    allQuestion: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    //获取所有的考试类型
    *examType({ payload }, { call, put }) {
      let data = yield call(examType);
      yield put({
        type: "updateexamtype",
        payload: data.data
      });
    },
    //获取所有的课程类型
    *coursetype({ payload }, { call, put }) {
      let data = yield call(coursetype);
      yield put({
        type: "updatecoursetype",
        payload: data.data
      });
    },
    //获取所有的题目类型
    *topictype({ payload }, { call, put }) {
      let data = yield call(topictype);
      yield put({
        type: "updatetopictype",
        payload: data.data
      });
    },
    //获取所有的试题
    *allNew({ payload }, { call, put }) {
      let data = yield call(allNew);
      yield put({
        type: "upadataAll",
        payload: data.data
      });
    },
    //添加试题类型
    *insertExam({payload}, { call, put }) {
      let data = yield call(insertExam, payload);
      console.log("data",data)
    }
  },

  reducers: {
    //获取所有的考试类型
    updateexamtype(state, { payload }) {
      return { ...state, examtypelist: payload };
    },
    //获取所有的课程类型
    updatecoursetype(state, { payload }) {
      return { ...state, coursetypelist: payload };
    },
    //获取所有的题目类型
    updatetopictype(state, { payload }) {
      return { ...state, topictypelist: payload };
    },
    //获取所有的试题
    upadataAll(state, { payload }) {
      return { ...state, allQuestion: payload };
    }
  }
};
