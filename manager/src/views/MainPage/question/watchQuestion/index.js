import React ,{useEffect}from "react";
import { Layout, Breadcrumb, Tag, Select, Button ,Table } from "antd";
import styles from "./index.css"


function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function WatchQuestion(props) {
  const { Content } = Layout;

  const CheckableTag = Tag.CheckableTag;

  const tagsFromServer = ["Movies", "Books", "Music", "Sports"];

  const selectedTags = [];

  const { Option } = Select;


  const columns = [
    {
      dataIndex: 'name',
      key: 'name', 
      render: text => (
        <>
            <h4>{text}</h4>
            <h4>
                <Tag color="blue">blue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="gold">gold</Tag>
            </h4>
            <a href="javascript:;">才能算扣除</a>
        </>
      ),
    },
    {
      key: 'action',
      render: (text, record) => (
        <span style={{position:"absolute",right:20}}>
          <a href="javascript:;">编辑</a>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John '
    },
    {
      key: '2',
      name: 'Jim Green'
    },
    {
      key: '3',
      name: 'Joe Black'
    },
  ];






  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h2>查看试题</h2>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              paddingLeft: 100,
              marginBottom: 20,
              minHeight: 120
            }}
          >
            <div>
              <h4 style={{ marginRight: 8, display: "inline" }}>Categories:</h4>
              {tagsFromServer.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={checked => this.handleChange(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </div>

            <div className={styles.headBottom}>
              <span>考试类型:</span>
              <Select
                showSearch
                style={{ width: 220 }}
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="周考1">周考1</Option>
                <Option value="周考2">周考2</Option>
                <Option value="周考3">周考3</Option>
                <Option value="月考">月考</Option>
              </Select>

              <span>题目类型:</span>
              <Select
                showSearch
                style={{ width: 210}}
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="简答题">简答题</Option>
                <Option value="代码补全">代码补全</Option>
                <Option value="代码阅读题">代码阅读题</Option>
                <Option value="修改bug">修改bug</Option> 
                <Option value="手写代码">手写代码</Option>
              </Select>

              <Button type="primary" icon="search">
                查询
              </Button>
            </div>
          </Content>

          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
          
          <Table columns={columns} dataSource={data} />
          
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}




export default WatchQuestion;
