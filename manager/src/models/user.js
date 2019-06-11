import {login} from "../services"
import {routerRedux} from 'dva/router'



export default {

    namespace: 'user',
    
    state: {
    // obj:{}

    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
        },
    },

    effects: {
        *login({payload}, {select,call, put}) {
            let data = yield call(login,payload)
            if(data.code===1){
                yield put((routerRedux.push("/main")))
            }
            // yield put({ type: 'save',payload:data });
      // const obj = yield select(state=>state.user.obj = data)

        },
        *fetch({payload}, {call,put}) { // eslint-disable-line
            yield put({ type: 'save' });
        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
    },

};

