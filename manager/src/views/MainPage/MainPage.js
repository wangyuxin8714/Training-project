import React, { Component } from "react";
import style from "./MainPage.css";
import { Menu, Icon, Dropdown, Button } from "antd";
const { SubMenu } = Menu;


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


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: "试题管理",
          icon: "gitlab",
          id: "123",
          data: [
            {
              title: "添加试题",
              id: "1230"
            },
            {
              title: "试题分类",
              id: "9630"
            },
            {
              title: "查看试题",
              id: "8520"
            }
          ]
        },
        {
          title: "用户管理",
          icon: "user",
          id: "452",
          data: [
            {
              title: "添加用户",
              id: "7410"
            },
            {
              title: "用户展示",
              id: "3697"
            }
          ]
        },
        {
          title: "考试管理",
          icon: "file-done",
          id: "175",
          data: [
            {
              title: "添加考试",
              id: "8654"
            },
            {
              title: "试卷列表",
              id: "1036"
            }
          ]
        },
        {
          title: "班级管理",
          icon: "project",
          id: "1832",
          data: [
            {
              title: "班级管理",
              id: "3026"
            },
            {
              title: "教室管理",
              id: "7542"
            },
            {
              title: "学生管理",
              id: "3620"
            }
          ]
        },
        {
          title: "阅卷管理",
          icon: "project",
          id: "156",
          data: [
            {
              id: "8543",
              title: "特批管理"
            }
          ]
        }
      ]
    };
  }
  render() {
    const { list } = this.state;
    return (
      <div className={style.mainWrap}>
        <header className={style.mainHeader}>
          <div className={style.mainHeader_left}>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
              alt=""
            />
          </div>

          <Dropdown overlay={menu} placement="bottomRight">
            <Button style={{height: 50}}>
              <div className={style.mainHeader_right}>
                <img
                  src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png"
                  alt=""
                />
                <span>yonghuming</span>
              </div>
            </Button>
          </Dropdown>
        </header>
        <main className={style.mainMain}>
          <div className={style.mainMain_left}>
            <div style={{ width: 250 }}>
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                {list.map(item => (
                  <SubMenu
                    key={item.id}
                    title={
                      <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                      </span>
                    }
                  >
                    {item.data.map(val => (
                      <Menu.Item key={val.id}>{val.title}</Menu.Item>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </div>
          </div>
          <div className={style.mainMain_right} />
        </main>
      </div>
    );
  }
}

export default MainPage;
