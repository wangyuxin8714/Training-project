import React ,{useState}from "react";
import { Layout, Breadcrumb,Card  } from "antd";

function AddUser() {
  const [key,updataKey] = useState('tab1')

  const tabList = [
    {
      key: 'tab1',
      tab: '用户数据',
    },
    {
      key: 'tab2',
      tab: '身份数据',
    },{
      key: 'tab3',
      tab: 'api接口权限',
    },
    {
      key: 'tab4',
      tab: '身份和api接口关系',
    },{
      key: 'tab5',
      tab: '视图接口权限',
    },
    {
      key: 'tab6',
      tab: '身份和视图权限关系',
    },
  ];
  
  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
    tab3: <p>content3</p>,
    tab4: <p>content4</p>,
    tab5: <p>content5</p>,
    tab6: <p>content6</p>,
  };

 
 const onTabChange = (key) => {
    updataKey(key)
  };


  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h2>用户展示</h2>

              <Card
                style={{ width: "100%"}}
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                  onTabChange(key);
                }}
              >
                {contentList[key]}
              </Card>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AddUser;
