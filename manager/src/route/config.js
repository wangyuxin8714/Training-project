// 引入路由
// import Login from "../views/login";
// import MainPage from "../views/MainPage";
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
// import NotFound from "../views/wrong/NotFound";
// import Access from "../views/wrong/Access";


export default {
  routes: [{
    name: 'router.questions',
    children: [{
      name: 'router.questions.add',
      id: 'main-addQuestions',
      path: '/question/add',
      component: AddQuestion
    },{
      name: 'router.questions.view',
      id: 'main-watchQuestions',
      path: '/question/watch',
      component: WatchQuestion
    },{
      name: 'router.questions.type',
      id: 'main-questionsType',
      path: '/question/type',
      component: TypeQuestion
    },{
      id: 'main-editQuestions',
      path: '/question/detail',
      component: Questiondetail
    },{
      id: 'main-questionsDetail',
      path: '/question/details',
      component: Details
    }]
  },{
    name: 'router.user',
    children: [{
      name: 'router.user.add',
      id: 'main-addUser',
      path: '/users/add',
      component: AddUser
    },{
      name: 'router.user.show',
      id: 'main-showUser',
      path: '/users/show',
      component: ShowUser
    }]
  },{
    name: 'router.exam',
    children: [{
      name: 'router.exam.add',
      id: 'main-addExam',
      path: '/exam/add',
      component: Addexam
    },{
      name: 'router.exam.list',
      id: 'main-examList',
      path: '/exam/list',
      component: Testlist
    },{
        id: 'main-examEdit',
        path:"/exam/addDetail",
        component:AddDetial
    },{
        id: 'main-examDetail',
        path:"/exam/listDetail/:id",
        component:ListDetail
    }]
  },{
    name: 'router.grade',
    children: [{
      name: 'router.grade.class',
      id: 'main-grade',
      path: '/grade/class',
      component: ClassManagement
    },{
      name: 'router.grade.room',
      id: 'main-room',
      path: '/grade/room',
      component: RoomManagement
    },{
      name: 'router.grade.student',
      id: 'main-student',
      path: '/grade/students',
      component: StudentManagement
    }]
  },{
    name: 'router.paper',
    children: [{
      name: 'router.paper.nobatch',
      id: 'main-examinationPapers',
      path: '/paper/nobatch',
      component: ClassPage
    },{
        id: 'main-examPaperClassList',
        path:"/paper/classmate",
        component:ClassMate
    },{
        id: 'main-examPaperClassmate',
        path:"/paper/detail/:id",
        component:PaperDetail
    }]
  }]
}