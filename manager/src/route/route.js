import Login from "../views/login";
import MainPage from "../views/MainPage";
import NotFound from "../views/wrong/NotFound";
import Access from "../views/wrong/Access";
const route=[
    {
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