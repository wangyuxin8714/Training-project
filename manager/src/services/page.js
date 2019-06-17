import request from "../utils/request"

//获取已经分配教室的班级
export function margerGrade(){
    return request({
        url:"/manger/grade",
        method:"GET"
    })
}

//获取未批卷学生试卷
export function getnopaper(params){
    return request({
        url:"/exam/student",
        method:"GET",
        params
    })
}

//获取未批卷学生试卷详情
export function godetail(){
    return request({
        url:"/exam/student/t27znv-gu7azm-qpq9ai-laaf9m",
        method:"GET",
    })
}