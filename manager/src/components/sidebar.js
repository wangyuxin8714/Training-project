import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import { injectIntl } from "react-intl";
import {connect} from 'dva';


const { SubMenu } = Menu;
function SideBar(props) {
  return (
    <Menu
      theme="dark"
      style={{ width: 200 }}
      mode="inline"
      defaultSelectedKeys={["0"]}
      defaultOpenKeys={["router.question"]}
    >
      {
        props.myView.map((item,index)=>(
          <SubMenu
            key={item.name}
            title={
              <span>
                <Icon type="gitlab" />
                <span>{props.intl.formatMessage({ id: item.name })}</span>
              </span>
            }
          >
            {
              item.children.map((value,index)=>{
                return  value.name&&<Menu.Item key={value.path}>
                    <Link to={value.path}>
                      {props.intl.formatMessage({ id: value.name })}
                    </Link>
                  </Menu.Item>
                
              })
            }
          </SubMenu>
        ))
      }
    </Menu>
  );
}

const mapStateToProps = state=>{
  return {
    myView: state.user.myView
  }
}
export default injectIntl(connect(mapStateToProps)(SideBar));
