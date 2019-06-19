import React from 'react';
import { Menu, Icon} from 'antd';
import { Link  } from 'dva/router';
import {injectIntl} from 'react-intl'


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
                  <span>{props.intl.formatMessage({id: 'router.questions'})}</span>
                </span>
              }
            >
              <Menu.Item key="/question/add"><Link to="/question/add">{props.intl.formatMessage({id: 'router.questions.add'})}</Link></Menu.Item>
              <Menu.Item key="/question/type"><Link to="/question/type">{props.intl.formatMessage({id: 'router.questions.type'})}</Link></Menu.Item>
              <Menu.Item key="/question/watch"><Link to="/question/watch">{props.intl.formatMessage({id: 'router.questions.view'})}</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="users"
              title={
                <span>
                  <Icon type="user" />
                  <span>{props.intl.formatMessage({id: 'router.user'})}</span>
                </span>
              }
            >
              <Menu.Item key="/users/add"><Link to="/users/add">{props.intl.formatMessage({id: 'router.user.add'})}</Link></Menu.Item>
              <Menu.Item key="/users/show"><Link to="/users/show">{props.intl.formatMessage({id: 'router.user.show'})}</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="exam"
              title={
                <span>
                  <Icon type="file-done" />
                  <span>{props.intl.formatMessage({id: 'router.exam'})}</span>
                </span>
              }
            >
              <Menu.Item key="/exam/add"><Link to="/exam/add">{props.intl.formatMessage({id: 'router.exam.add'})}</Link></Menu.Item>
              <Menu.Item key="/exam/list"><Link to="/exam/list">{props.intl.formatMessage({id: 'router.exam.list'})}</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="grade"
              title={
                <span>
                  <Icon type="project" />
                  <span>{props.intl.formatMessage({id: 'router.grade'})}</span>
                </span>
              }
            >
              <Menu.Item key="/grade/class"><Link to="/grade/class">{props.intl.formatMessage({id: 'router.grade.class'})}</Link></Menu.Item>
              <Menu.Item key="/grade/room"><Link to="/grade/room">{props.intl.formatMessage({id: 'router.grade.room'})}</Link></Menu.Item>
              <Menu.Item key="/grade/students"><Link to="/grade/students">{props.intl.formatMessage({id: 'router.grade.student'})}</Link></Menu.Item>
            </SubMenu>
          
            <SubMenu
              key="paper"
              title={
                <span>
                  <Icon type="project" />
                  <span>{props.intl.formatMessage({id: 'router.paper'})}</span>
                </span>
              }
            >
              <Menu.Item key="/paper/nobatch"><Link to="/paper/nobatch">{props.intl.formatMessage({id: 'router.paper.nobatch'})}</Link></Menu.Item>
            </SubMenu>
          </Menu>
  )
}

export default injectIntl(SideBar);
