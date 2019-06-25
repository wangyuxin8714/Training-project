import dynamic from 'dva/dynamic';


// 引入路由

const AddQuestion = dynamic({
  component: () => import('../views/MainPage/question/addquestion'),
});
const TypeQuestion = dynamic({
  component: () => import('../views/MainPage/question/typeQuestion'),
});
const WatchQuestion = dynamic({
  component: () => import('../views/MainPage/question/watchQuestion'),
});
const Questiondetail = dynamic({
  component: () => import('../views/MainPage/question/questiondetail'),
});
const Details = dynamic({
  component: () => import('../views/MainPage/question/details'),
});
const AddUser = dynamic({
  component: () => import('../views/MainPage/users/addUser'),
});
const ShowUser = dynamic({
  component: () => import('../views/MainPage/users/showUser'),
});
const Addexam = dynamic({
  component: () => import('../views/MainPage/exam/addexam'),
});
const AddDetial = dynamic({
  component: () => import('../views/MainPage/exam/adddetial'),
});
const Testlist = dynamic({
  component: () => import('../views/MainPage/exam/testlist'),
});
const ListDetail = dynamic({
  component: () => import('../views/MainPage/exam/listdetail'),
});
const ClassManagement = dynamic({
  component: () => import('../views/MainPage/grade/classManagement'),
});
const RoomManagement = dynamic({
  component: () => import('../views/MainPage/grade/roomManagement'),
});
const StudentManagement = dynamic({
  component: () => import('../views/MainPage/grade/studentManagement'),
});
const ClassPage = dynamic({
  component: () => import('../views/MainPage/paper/classPage'),
});
const ClassMate = dynamic({
  component: () => import('../views/MainPage/paper/classmate'),
});
const PaperDetail = dynamic({
  component: () => import('../views/MainPage/paper/paperdetail'),
});

export default {
  routes: [{
    name: 'router.question',
    children: [{
      name: 'router.question.add',//国际化匹配
      id: 'main-addQuestions',//视图权限
      path: '/question/add',//路由匹配路径
      component: AddQuestion//路由跳转文件
    },{
      name: 'router.question.view',
      id: 'main-watchQuestions',
      path: '/question/watch',
      component: WatchQuestion
    },{
      name: 'router.question.type',
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
      path: '/user/add',
      component: AddUser
    },{
      name: 'router.user.show',
      id: 'main-showUser',
      path: '/user/show',
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