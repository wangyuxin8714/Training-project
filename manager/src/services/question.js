import request from '../utils/request';


//获取所有的考试类型接口
export function examType() {
    return request({
        url: '/exam/examType',
        method: 'GET'
    })
}

//获取课程类型接口
export function coursetype() {
    return request({
        url: '/exam/subject',
        method: 'GET'
    })
}

//获取题目类型接口
export function topictype() {
    return request({
        url: '/exam/getQuestionsType',
        method: 'GET'
    })
}

//获取试题接口
export function allNew() {
    return request({
        url: '/exam/questions/new',
        method: 'GET'
    })
}


//添加试题类型
export function insertExam(params){
    return request({
        url:'/exam/insertQuestionsType',
        method:'GET',
        params
    })
}