import request from '../utils/request';

// 登陆接口
export function login(params) {
    return request({
        url: '/user/login',
        method: 'POST',
        data: params
    })
}

export function examType() {
    return request({
        url: '/exam/examType',
        method: 'GET'
    })
}

export function coursetype() {
    return request({
        url: '/exam/subject',
        method: 'GET'
    })
}

export function topictype() {
    return request({
        url: '/exam/getQuestionsType',
        method: 'GET'
    })
}


export function allNew() {
    return request({
        url: '/exam/questions/new',
        method: 'GET'
    })
}