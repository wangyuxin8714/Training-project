//试题接口
import request from '../utils/request';

//获取考试类型接口
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

//获取当前接口
export function getuser() {
    return request({
        url: '/user/userInfo',
        method: 'GET'
    })
}

//添加试题接口
export function addquestion(params) {
    return request({
        url: '/exam/questions',
        method: 'POST',
        data:params
    })
}

// 添加考试接口
export function addexam(params) {
    return request({
        url: '/exam/exam',
        method: 'POST',
        data:params
    })
}

// 获取所有试卷接口
export function testlist() {
    return request({
        url: '/exam/exam',
        method: 'GET'
    })
}

// 查询试题接口
export function lookquestion(params) {
    return request({
        url: '/exam/questions/condition',
        method: 'GET',
        params
    })
}

// 更新试题接口
export function updatequestion(params) {
    return request({
        url: '/exam/questions/update',
        method: 'PUT',
        data:params
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