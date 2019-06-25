import React, { useEffect,useState } from "react";
import styles from "./index.css";
import { Route, Switch, Redirect } from "dva/router";
import { Layout, Menu, Dropdown, Button, Select } from "antd";
import Sidebar from "../../components/sidebar";
import { connect } from "dva";




const { Header, Content, Sider } = Layout;
const { Option } = Select;

function MainPage(props) {
  
  if (!props.myView.length) {
    return null;
  }

 const [pathname,updatepathname]=useState(false)
useEffect(()=>{
  updatepathname(props.myView[0].children[0].path)
},[props.myView[0]])



  const { loading } = props;

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={()=>{
              props.history.push("/personal")
            }
          }
        >
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          onClick={() => {
            props.outlogin()
            props.history.push("/login");
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
                  src={props.question.avatar}
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
              {pathname&&<Redirect exact from="/" to={pathname} />}
              {/* 渲染该用户拥有的路由 */}
              {props.myView.map(item => {
                return (
                  item.children &&
                  item.children.map((value, key) => {
                    return (
                      <Route
                        key={key}
                        path={value.path}
                        component={value.component}
                      />
                    );
                  })
                );
              })}
              {/* 403路由 */}
              {props.forbiddenView.map(item => {
                return <Redirect key={item} from={item} to="/access" />;
              })}
              {/* 剩余路由去404 */}
              {/* <Redirect to="/notFound" /> */}
            </Switch>
          </Content>
          {loading ? (
            <div className={styles.loading}>
              <p />
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
    forbiddenView: state.user.forbiddenView,
    imgsrc:state.user.imgsrc
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
    },
    outlogin(){
      dispatch({
        type:"user/outlogin"
      })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
