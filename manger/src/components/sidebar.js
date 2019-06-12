import React from 'react';
import { Menu, Icon} from 'antd';
import { Link  } from 'dva/router';

const { SubMenu } = Menu;
function SideBar(props){
  return (
    <Menu
            theme="dark"
            style={{ width: 200 }}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['question']}
          >
            <SubMenu
              key="question"
              title={
                <span>
                  <Icon type="gitlab" />
                  <span>试题管理</span>
                </span>
              }
            >
              <Menu.Item key="/question/add"><Link to="/question/add">添加试题</Link></Menu.Item>
              <Menu.Item key="/question/type"><Link to="/question/type">试题分类</Link></Menu.Item>
              <Menu.Item key="/question/watch"><Link to="/question/watch">查看试题</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="users"
              title={
                <span>
                  <Icon type="user" />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="/users/add"><Link to="/users/add">添加用户</Link></Menu.Item>
              <Menu.Item key="/users/show"><Link to="/users/show">用户展示</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="exam"
              title={
                <span>
                  <Icon type="file-done" />
                  <span>考试管理</span>
                </span>
              }
            >
              <Menu.Item key="/exam/add"><Link to="/exam/add">添加考试</Link></Menu.Item>
              <Menu.Item key="/exam/list"><Link to="/exam/list">试卷列表</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="grade"
              title={
                <span>
                  <Icon type="project" />
                  <span>班级管理</span>
                </span>
              }
            >
              <Menu.Item key="/grade/class"><Link to="/grade/class">班级管理</Link></Menu.Item>
              <Menu.Item key="/grade/room"><Link to="/grade/room">教室管理</Link></Menu.Item>
              <Menu.Item key="/grade/students"><Link to="/grade/students">学生管理</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="paper"
              title={
                <span>
                  <Icon type="project" />
                  <span>阅卷管理</span>
                </span>
              }
            >
              <Menu.Item key="/paper/nobatch"><Link to="/paper/nobatch">待批班级</Link></Menu.Item>
            </SubMenu>
          </Menu>
  )
}

export default SideBar;
