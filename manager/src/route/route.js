import Login from "../views/login";
import MainPage from "../views/MainPage";
import Wrong from "../views/wrong/notFound"
import AddQuestion from "../views/MainPage/question/addquestion";
import TypeQuestion from "../views/MainPage/question/typeQuestion";
import WatchQuestion from "../views/MainPage/question/watchQuestion";
import Questiondetail from "../views/MainPage/question/questiondetail";
import Details from "../views/MainPage/question/details";
import AddUser from "../views/MainPage/users/addUser";
import ShowUser from "../views/MainPage/users/showUser";
import Addexam from "../views/MainPage/exam/addexam";
import AddDetial from "../views/MainPage/exam/adddetial";
import Testlist from "../views/MainPage/exam/testlist";
import ListDetail from "../views/MainPage/exam/listdetail";
import ClassManagement from "../views/MainPage/grade/classManagement";
import RoomManagement from "../views/MainPage/grade/roomManagement";
import StudentManagement from "../views/MainPage/grade/studentManagement";
import ClassPage from "../views/MainPage/paper/classPage";
import ClassMate from "../views/MainPage/paper/classmate";
import PaperDetail from "../views/MainPage/paper/paperdetail";
const route=[
    {
        path:"/wrong",
        component:Wrong
    },{
        path:"/login",
        component:Login
    },{
        path:"/",
        component:MainPage,
        children:[
            {
                path:"/question/add",
                component:AddQuestion
            },{
                path:"/question/type",
                component:TypeQuestion
            },{
                path:"/question/watch",
                component:WatchQuestion
            },{
                path:"/question/detail",
                component:Questiondetail
            },{
                path:"/question/details",
                component:Details
            },{
                path:"/users/add",
                component:AddUser
            },{
                path:"/users/show",
                component:ShowUser
            },{
                path:"/exam/add",
                component:Addexam
            },{
                path:"/exam/addDetail",
                component:AddDetial
            },{
                path:"/exam/list",
                component:Testlist
            },{
                path:"/exam/listDetail/:id",
                component:ListDetail
            },{
                path:"/grade/class",
                component:ClassManagement
            },{
                path:"/grade/room",
                component:RoomManagement
            },{
                path:"/grade/students",
                component:StudentManagement
            },{
                path:"/paper/nobatch",
                component:ClassPage
            },{
                path:"/paper/classmate",
                component:ClassMate
            },{
                path:"/paper/detail/:id",
                component:PaperDetail
            },{
                from:"/",
                to:"/question/add"
            }
        ]
    }
]

export default route 