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

//展示用户数据
export function showUser(){
    return request({
        url:"/user/user",
        method:"GET"
    })
}


//展示身份和api权限关系
export function identApiAuthor(){
    return request({
        url:"/user/identity_api_authority_relation",
        method:"GET"
    })
}


//获取视图权限数据
export function viewAuthor(){
    return request({
        url:"/user/view_authority",
        method:"GET"
    })
}


//展示身份和视图权限关系
export function viewRelate(){
    return request({
        url:"/user/identity_view_authority_relation",
        method:"GET"
    })
}


//添加用户 
export function userAdd(data){
    return request({
        url:"/user",
        method:"POST",
        data
    })
}