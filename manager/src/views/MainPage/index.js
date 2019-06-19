import React from "react";
import styles from "./index.css";
import {Layout, Menu,Dropdown,Button,Select } from 'antd';
import Sidebar from "../../components/sidebar"
import { Route,Switch ,Redirect } from 'dva/router';
import {connect} from 'dva';


import AddQuestion from "./question/addquestion";
import TypeQuestion from "./question/typeQuestion";
import WatchQuestion from "./question/watchQuestion";
import Addexam from "./exam/addexam";
import Testlist from "./exam/testlist";
import Questiondetail from "./question/questiondetail";
import AddUser from "./users/addUser"
import ShowUser from "./users/showUser"
import Details from "./question/details";
import ClassPage from "./paper/classPage";
import ClassMate from "./paper/classmate"
import PaperDetail from "./paper/paperdetail";
import classManagement from "./grade/classManagement";
import roomManagement from "./grade/roomManagement";
import studentManagement from "./grade/studentManagement";
import aAddDetial from "./exam/adddetial";
import ListDetail from "./exam/listdetail";



const { Header, Content, Sider } = Layout;
const { Option } = Select;
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          个人中心
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        我的班级
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        设置
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          退出登录
      </a>
    </Menu.Item>
  </Menu>
);


function MainPage(props){


  let zh_en=value=>{
    props.changeLocal(value)
  }


  return (
    <Layout className={styles.mainWrap}>
      <Header className={styles.mainHeader}>
        <div className={styles.mainHeader_left}>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
              alt=""
            />
          </div>
          <div className={styles.right}>
            <Select
                showSearch
                style={{ width: 80 }}
                placeholder="中文"
                defaultValue="zh"
                optionFilterProp="children"
                onChange={zh_en}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="zh">中文</Option>
                <Option value="en">英文</Option>
              </Select>
            <Dropdown overlay={menu} placement="bottomRight" className="asdfa">
              <Button style={{height: 50,border:0}}>
                <div className={styles.mainHeader_right}>
                  <img
                    src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png"
                    alt=""
                  />
                  <span>yonghuming</span>
                </div>
              </Button>
            </Dropdown>

          </div>
            
      </Header>
      <Layout background="eee">
        <Sider>
          <Sidebar></Sidebar>
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            <Switch>
              <Redirect from ="/" to="/question/add" exact></Redirect>
              <Route path="/question/add"  component={AddQuestion} />
              <Route path="/question/type"  component={TypeQuestion} />
              <Route path="/question/watch"  component={WatchQuestion} />
              <Route path="/exam/add"  component={Addexam} />
              <Route path="/exam/addDetail"  component={aAddDetial} />
              <Route path="/exam/list"  component={Testlist} />
              <Route path="/exam/listDetail/:id"  component={ListDetail} />
              <Route path="/question/detail"  component={Questiondetail} />
              <Route path="/question/details"  component={Details} />
              <Route path="/users/add"  component={AddUser} />
              <Route path="/users/show"  component={ShowUser} />
              <Route path="/question/details"  component={Details} />
              <Route path="/paper/nobatch" component={ClassPage} />
              <Route path="/paper/classmate" component={ClassMate} />
              <Route path="/paper/detail/:id" component={PaperDetail} />
              <Route path="/grade/class"  component={classManagement} />
              <Route path="/grade/room"  component={roomManagement} />
              <Route path="/grade/students"  component={studentManagement} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = state=>{
  return {
    locale: state.global.locale
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    changeLocal: payload=>{
      dispatch({
        type: 'global/changeLocale',
        payload
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);








