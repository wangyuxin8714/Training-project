import {login} from "../services"
import {routerRedux} from 'dva/router'



export default {

    namespace: 'user',
    
    state: {

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