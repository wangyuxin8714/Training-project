import React, { Component } from "react";
import style from "./MainPage.css";
import { Menu, Icon, Button } from "antd";
const { SubMenu } = Menu;

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[
            {
                "title":"试题管理",
                "icon":"anticon anticon-sliders",
                "data":[
                    {
                        "title":"添加试题"
                    },{
                        "title":"试题分类"
                    },{
                        "title":"查看试题"
                    }
                ]
            },
            {
                "title":"用户管理",
                "icon":"anticon anticon-user",
                "data":[
                    {
                        "title":"添加用户"
                    },{
                        "title":"用户展示"
                    }
                ]
            },{
                "title":"考试管理",
                "icon":"anticon anticon-schedule",
                "data":[
                    {
                        "title":"添加考试"
                    },{
                        "title":"试卷列表"
                    }
                ]
            },{
                "title":"班级管理",
                "icon":"anticon anticon-project",
                "data":[
                    {
                        "title":"班级管理"
                    },{
                        "title":"教室管理"
                    },{
                        "title":"学生管理"
                    }
                ]
            },{
                "title":"阅卷管理",
                "icon":"anticon anticon-project",
                "data":[
                    {
                        "title":"特批管理"
                    }
                ]
            }
        ]
    };
  }
  render() {
    const {list} = this.state;
    return (
      <div className={style.mainWrap}>
        <header className={style.mainHeader}>
          <div className={style.mainHeader_left}>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
              alt=""
            />
          </div>
          <div className={style.mainHeader_right}>
            <img
              src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png"
              alt=""
            />
            <span>yonghuming</span>
          </div>
        </header>
        <main className={style.mainMain}>
          <div className={style.mainMain_left}>
            <div style={{ width: 200 }}>
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                {
                    list.map((item,index)=>(
                        <SubMenu
                            key={index}
                            title={
                                <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                                </span>
                            }
                            >
                            {
                                item.data.map((val,ind)=>(
                                 <Menu.Item key={ind}>{val.title}</Menu.Item>
                                ))
                            }
                        </SubMenu>
                    ))
                }
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
