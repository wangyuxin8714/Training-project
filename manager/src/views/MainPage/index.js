import React, { useEffect } from "react";
import styles from "./index.css";
import { Route, Switch, Redirect } from 'dva/router';
import { Layout, Menu, Dropdown, Button, Select, Spin } from "antd";
import Sidebar from "../../components/sidebar";
import { connect } from "dva";
import { delToken } from "../../utils/user";




const { Header, Content, Sider } = Layout;
const { Option } = Select;

function MainPage(props) {
  if (!props.myView.length){
    return null;
  }


  const { loading } = props;
  
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          我的班级
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          设置
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          onClick={() => {
            props.history.push("/Login");
            delToken();
          }}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    props.getName();
  }, []);

  let zh_en = value => {
    props.changeLocal(value);
  };

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
            <Button style={{ height: 50, border: 0 }}>
              <div className={styles.mainHeader_right}>
                <img
                  src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png"
                  alt=""
                />
                <span>{props.question.useName}</span>
              </div>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Layout background="eee">
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0
            }}
          >
            <Switch>
              <Redirect exact from="/" to="/question/add"/>
              {/* 渲染该用户拥有的路由 */}
              {
                props.myView.map(item=>{
                  
                    return item.children&&item.children.map((value,key)=>{
                      return  <Route key={key} path={value.path} component={value.component}/>
                    })
                })
              }
              {/* 403路由 */}
              {props.forbiddenView.map((item)=>{
                return <Redirect key={item} from={item} to="/access"/>
              })}
              {/* 剩余路由去404 */}
              <Redirect to="/notFound"/>
            </Switch>


          </Content>
          {loading ? (
            <div className={styles.loading}>
              <img src="../../assets/loading.gif" alt=""/>
            </div>
          ) : null}
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    locale: state.global.locale,
    loading: state.loading.global,
    question: state.question,
    myView: state.user.myView,
    forbiddenView: state.user.forbiddenView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLocal: payload => {
      dispatch({
        type: "global/changeLocale",
        payload
      });
    },
    getName() {
      dispatch({
        type: "question/getuser"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
