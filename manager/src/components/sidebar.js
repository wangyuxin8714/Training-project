import React ,{useState}from "react";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import { injectIntl } from "react-intl";
import {connect} from 'dva';


const { SubMenu } = Menu;
function SideBar(props) {

  const [openKey]=useState(["router.question"])
  let onOpenChange = openKeys => {
      let ind=openKeys.findIndex(item=>openKey.indexOf(item)===-1)
      openKey[0]=openKeys[ind]
  };

  return (
    <Menu
      theme="dark"
      style={{ width: 200 }}
      mode="inline"
      defaultSelectedKeys={["0"]}
      openKeys={openKey}
      onOpenChange={onOpenChange}
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
