import {login} from "../services"
import {routerRedux} from 'dva/router'
import {getToken,setToken} from "../utils/user"


export default {

    namespace: 'user',
    
    state: {
<<<<<<< HEAD
    // obj:{}

=======
        islogin:0
>>>>>>> wyx
    },

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
            return history.listen(({ pathname }) => {
                // console.log('pathname...', pathname);
                if (pathname.indexOf('/login') === -1) {
                  // 不去登陆页面做token检测
                  if (!getToken()){
                    // 利用redux做路由跳转
                    dispatch(routerRedux.replace({
                      pathname: `/login?redirect=${encodeURIComponent(pathname)}`,
                    }))
                  }
                }else{
                //   去登陆页面，如果已登陆跳回首页
                  if (getToken()){
                     // 利用redux做路由跳转
                     dispatch(routerRedux.replace({
                      pathname: `/`,
                    }))
                  }
                }
              });
        },
    },

    effects: {
        *login({payload}, {select,call, put}) {
            let data = yield call(login,payload)
            console.log(data)
            if(data.code===1){
                setToken(data.token)
            }
<<<<<<< HEAD
            // yield put({ type: 'save',payload:data });
      // const obj = yield select(state=>state.user.obj = data)
=======

            yield put({type:"updatalogin",payload:data.code===1?1:-1})
            
>>>>>>> wyx

        },
        *fetch({payload}, {call,put}) { // eslint-disable-line
            yield put({ type: 'save' });
        },
    },

    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
        updatalogin(state,{payload}){
            return {...state,islogin:payload}
        }
    },

};

