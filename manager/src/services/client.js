//用户管理数据

import request from "../utils/request"

//展示身份数据
export function identity(){
    return request({
        url:"/user/identity",
        method:"GET"
    })
}

//展示api接口权限数据
export function apiAuthority(){
    return request({
        url:"/user/api_authority",
        method:"GET"
    })
}

//获取视图权限数据
export function viewAuthority(){
    return request({
        url:"/user/view_authority",
        method:"GET"
    })
}