import request from '../utils/request';

// 获取班级接口
export function getClass() {
    return request({
        url: '/manger/grade',
        method: 'GET',
    })
}

// 获取教室号接口
export function getRoom() {
    return request({
        url: '/manger/room',
        method: 'GET',
    })
}
// 添加班级接口
export function addClass(params) {
    return request({
        url: '/manger/grade',
        method: 'POST',
        data:params
    })
}

// 更新班级信息
export function changeGrade(params) {
    return request({
        url: '/manger/grade/update',
        method: 'PUT',
        data:params
    })
}

// 删除班级信息
export function delClass(params) {
    return request({
        url: '/manger/grade/delete',
        method: 'DELETE',
        data:params
    })
}

//获取所有学生
export function getStudent() {
    return request({
        url: '/manger/student',
        method: 'GET',
    })
}