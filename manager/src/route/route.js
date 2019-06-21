import dynamic from 'dva/dynamic';

// 引入路由

const Login = dynamic({
    component: () => import('../views/login'),
});
const MainPage = dynamic({
    component: () => import('../views/MainPage'),
});
const NotFound = dynamic({
    component: () => import('../views/wrong/NotFound'),
});
const Access = dynamic({
    component: () => import('../views/wrong/Access'),
});
const Excel = dynamic({
    component: () => import('../views/MainPage/paper/excel'),
});


const route=[
    {
        path:"/excel",
        component:Excel
    },{
        path:"/access",
        component:Access
    },{
        path:"/notFound",
        component:NotFound
    },{
        path:"/login",
        component:Login
    },{
        path:"/",
        component:MainPage
    }
]

export default route 