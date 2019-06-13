import React from "react";
import styles from "./index.css";
import { Layout, Menu,Dropdown,Button } from 'antd';
import Sidebar from "../../components/sidebar"
import { Route,Switch ,Redirect } from 'dva/router';
import AddQuestion from "./question/addquestion";
import TypeQuestion from "./question/typeQuestion";
import WatchQuestion from "./question/watchQuestion";
import Addexam from "./exam/addexam";
import Testlist from "./exam/testlist";
import Questiondetail from "./question/questiondetail";

const { Header, Content, Sider } = Layout;

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
  return (
    <Layout className={styles.mainWrap}>
      <Header className={styles.mainHeader}>
        <div className={styles.mainHeader_left}>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
              alt=""
            />
          </div>
          
          <Dropdown overlay={menu} placement="bottomRight" className="asdfa">
            <Button style={{height: 50}}>
              <div className={styles.mainHeader_right}>
                <img
                  src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png"
                  alt=""
                />
                <span>yonghuming</span>
              </div>
            </Button>
          </Dropdown>
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
              <Redirect from ="/" to="/exam/add" exact></Redirect>
              <Route path="/question/add"  component={AddQuestion} />
              <Route path="/question/type"  component={TypeQuestion} />
              <Route path="/question/watch"  component={WatchQuestion} />
              <Route path="/exam/add"  component={Addexam} />
              <Route path="/exam/list"  component={Testlist} />
              <Route path="/question/detail"  component={Questiondetail} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}




export default MainPage;








