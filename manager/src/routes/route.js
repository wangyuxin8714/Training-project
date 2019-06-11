import Home from "../views/home/home"
import MainPage from "../views/MainPage/MainPage"
import QuestionsType from "../views/main/questionsType"
import WatchQuestions from "../views/main/watchQuestions"
import AddUser from "../views/main/addUser"
import ShowUser from "../views/main/showUser"
import AddExam from "../views/main/addExam"
import List from "../views/main/list"
import Grade from "../views/main/grade"
import Room from "../views/main/room"
import Student from "../views/main/student"
import Classlist from "../views/main/classlist"




const route = [
    {
        path:"/main",
        component:MainPage,
        children:[
            {
                path:"/main/addQuestions",
                component:addQuestions,
                pathName:"添加试题"
            },{
                path:"/main/questionsType",
                component:QuestionsType,
                pathName:"试题分类"
            },{
                path:"/main/watchQuestions",
                component:WatchQuestions,
                pathName:"查看试题"
            },{
                path:"/main/addUser",
                component:AddUser,
                pathName:"添加用户"
            },{
                path:"/main/showUser",
                component:ShowUser,
                pathName:"用户展示"
            },{
                path:"/main/addExam",
                component:AddExam,
                pathName:"添加考试"
            },{
                path:"/main/list",
                component:List,
                pathName:"试卷列表"
            },{
                path:"/main/grade",
                component:Grade,
                pathName:"班级管理"
            },{
                path:"/main/room",
                component:Room,
                pathName:"教室管理"
            },{
                path:"/main/student",
                component:Student,
                pathName:"学生管理"
            },{
                path:"/main/classlist",
                component:Classlist,
                pathName:"特此班级"
            },{
                from:"/main",
                to:"/main/addQuestions"
            }
        ]
    },
    {
        path:"/",
        component:Home
    }
]

export default route;