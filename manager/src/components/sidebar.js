import React ,{useState}from "react";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import { injectIntl } from "react-intl";
import {connect} from 'dva';
import {withRouter} from 'react-router-dom'

const { SubMenu } = Menu;
function SideBar(props) {


let str="router."+(props.location.pathname.split("/")[1]?props.location.pathname.split("/")[1]:"question")
let arr=[]
arr[0]=str

  const [openKey]=useState(arr)
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
          item.children.length&&<SubMenu
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
                return  value.name&&<Menu.Item key={value.path} 
                style={{backgroundColor:props.location.pathname===value.path?"#1890ff":"#000"}}>
                    <Link to={value.path} style={{color:props.location.pathname===value.path?"#fff":""}}>
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
export default injectIntl(connect(mapStateToProps)(withRouter(SideBar)));
